import { getCurrentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface InvitePageProps {
	params: {
		inviteCode: string;
	};
}

const InvitePage = async ({ params }: InvitePageProps) => {
	const profile = await getCurrentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	if (!params.inviteCode) {
		return redirect('/');
	}

	const alreadyInServer = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	if (alreadyInServer) {
		return redirect(`/servers/${alreadyInServer.id}`);
	}

	const serverNotFound = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
		},
	});

	if (!serverNotFound) {
		return redirect(`/`);
	}

	const server = await db.server.update({
		where: {
			inviteCode: params.inviteCode,
		},
		data: {
			members: {
				create: [
					{
						profileId: profile.id,
					},
				],
			},
		},
	});

	if (server) {
		return redirect(`/servers/${server.id}`);
	}

	return null;
};

export default InvitePage;
