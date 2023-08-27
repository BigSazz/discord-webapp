import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<main>
			<UserButton
				afterSignOutUrl='/' // Redirect to home page after sign out
			/>
			<ModeToggle />
		</main>
	);
}
