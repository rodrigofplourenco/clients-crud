import { useState } from "react";
import { useRouter } from 'next/router';

const FormAddClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch('api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' }
    });

    router.reload();
  }

  return (
    <div className='form-control'>
      <label className="label pt-6">
        <span className="label-text">Qual é o nome do cliente?</span>
      </label>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Escreva aqui" className="input input-bordered w-full max-w-xs" />

      <label className="label pt-6">
        <span className="label-text">Qual é o email do cliente?</span>
      </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Escreva aqui" className="input input-bordered w-full max-w-xs" />

      <button className='btn btn-success mt-6' onClick={handleClick}>Adicionar</button>
    </div>
  )
}

export default FormAddClient