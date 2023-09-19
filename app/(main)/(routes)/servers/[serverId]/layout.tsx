import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

import { getCurrentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { ServerSidebar } from '@/components/server/ServerSidebar';

const ServerLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
}) => {
	const profile = await getCurrentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server = await db.server.findUnique({
		where: {
			id: params.serverId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	if (!server) {
		return redirect('/');
	}

	return (
		<div className='h-full'>
			<div className='hidden md:flex flex-col fixed h-full w-60 z-20 inset-y-0'>
				<ServerSidebar serverId={params.serverId} />
			</div>
			<main className='h-full md:pl-60'>{children}</main>
		</div>
	);
};

export default ServerLayout;
