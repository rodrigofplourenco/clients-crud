import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IUser } from '../dto/IUser';

import { useRouter } from 'next/router';

interface IProps {
  user: IUser;
}

const ModalEditClient = ({ user }: IProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const id = user.id;
  const router = useRouter();

  const handleClick = async () => {
    const user = await fetch('api/users/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email })
    });

    router.reload();
  }

  useEffect(() => {
    setName(user.name || '');
    setEmail(user.email);
  }, [user.name, user.email])

  return (
    <>
      <label htmlFor={`my-modal-${user.id}`} className="pl-2 cursor-pointer"><FaEdit /></label>

      <input type="checkbox" id={`my-modal-${user.id}`} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={`my-modal-${user.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          <div className='form-control'>
            <h2>Editar cliente</h2>

            <label className="label pt-6">
              <span className="label-text">Qual é o novo nome do cliente?</span>
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Escreva aqui" className="input input-bordered w-full" />

            <label className="label pt-6">
              <span className="label-text">Qual é o novo email do cliente?</span>
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Escreva aqui" className="input input-bordered w-full" />

            <button className='btn btn-success mt-6' onClick={handleClick}>Editar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalEditClient