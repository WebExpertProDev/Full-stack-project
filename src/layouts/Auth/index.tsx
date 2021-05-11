/**
 *
 * Auth
 *
 */
import React from 'react';
import Modal from '../Modal';
import SignIn from './SignIn';
import SignUp from './SingUp';

// InterFaces
import { IAuth } from './Auth';

export const AuthModal: React.FunctionComponent<IAuth.IProps> = ({ isOpen, closeAuthModal }) => {
  const arra = [
    {
      title: 'Sign In',
      component: SignIn,
    },
    {
      title: 'Sign Up',
      component: SignUp,
    },
  ];
  return (
    <div>
      <Modal status={isOpen} changeStatus={() => closeAuthModal()} tabs={arra} />
    </div>
  );
};

export default AuthModal;
