'use client';

import { useState, useEffect } from 'react';
import { CreateServerModal } from '../modals/createServerModal';
import { InviteModal } from '../modals/inviteModal';
import { EditServerModal } from '../modals/editServerModal';
import { MembersModal } from '../modals/membersModal';
import { CreateChannelModal } from '../modals/createChannelModal';
import { LeaveServerModal } from '../modals/leaveServerModal';
import { DeleteServerModal } from '../modals/deleteServerModal';
import { DeleteChannelModal } from '../modals/deleteChannelModal';
import { EditChannelModal } from '../modals/editChannelModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<CreateServerModal />
			<CreateChannelModal />
			<InviteModal />
			<EditServerModal />
			<MembersModal />
			<LeaveServerModal />
			<DeleteServerModal />
			<DeleteChannelModal />
			<EditChannelModal />
		</>
	);
};
