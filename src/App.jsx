
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

function LandingPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">VersoZap</h1>
      <p className="mb-6">Receba trechos da Bíblia todos os dias no seu WhatsApp.</p>
      <Link to="/checkout">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg">Assinar agora</button>
      </Link>
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Plano: R$9,90/mês</h2>
      <p className="mb-4">Clique abaixo para simular o pagamento aprovado.</p>
      <button onClick={() => navigate('/cadastro')} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
        Simular pagamento
      </button>
    </div>
  );
}

function CadastroPage() {
  const [form, setForm] = useState({ nome: '', telefone: '', versao_biblia: 'ARA', plano_leitura: 'anual', tipo_ordem: 'normal', horario_envio: '08:00' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('sucesso');
      } else {
        setStatus('erro');
      }
    } catch {
      setStatus('erro');
    }
  };

  if (status === 'sucesso') return <Navigate to="/conectar" />;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Complete seu cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" placeholder="Nome" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone (com DDD)" className="w-full border p-2 rounded" onChange={handleChange} required />

        <select name="versao_biblia" className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="ARA">ARA</option>
          <option value="NVI">NVI</option>
          <option value="ACF">ACF</option>
          <option value="NTLH">NTLH</option>
        </select>

        <select name="plano_leitura" className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="anual">Anual</option>
          <option value="misto">Misto (VT+NT)</option>
          <option value="cronologico">Cronológico</option>
        </select>

        <select name="tipo_ordem" className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="normal">Sequência da Bíblia</option>
          <option value="cronologico">Ordem cronológica</option>
        </select>

        <input name="horario_envio" type="time" className="w-full border p-2 rounded" onChange={handleChange} required />

        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl w-full">Cadastrar</button>
      </form>
      {status === 'erro' && <p className="text-red-600 mt-4">Erro ao cadastrar. Tente novamente.</p>}
    </div>
  );
}

function ConectarPage() {
  return (
    <div className="p-10 text-center max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Conecte seu WhatsApp</h2>
      <p className="mb-6">Abra o aplicativo VersoZap instalado no seu computador e escaneie o QR Code para ativar os envios.</p>
      <img src="https://i.imgur.com/UQrBPMb.png" alt="QR code exemplo" className="mx-auto max-w-xs" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/conectar" element={<ConectarPage />} />
      </Routes>
    </Router>
  );
}
