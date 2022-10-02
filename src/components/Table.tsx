import { IUser } from '../dto/IUser';
import { FaWindowClose } from 'react-icons/fa';
import ModalEditClient from './ModalEditClient';

import { useRouter } from 'next/router';

interface IProps {
  users: IUser[];
}

const Table = ({ users }: IProps) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const user = await fetch('api/users/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    router.reload();
  }

  return (
    <div className="overflow-x-auto py-6">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Email</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt.toString()}</td>
              <td className='flex justify-center items-center'>
                <FaWindowClose className='cursor-pointer' onClick={() => handleDelete(user.id)} />
                <ModalEditClient user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table