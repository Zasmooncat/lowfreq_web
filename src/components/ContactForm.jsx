import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ email: "", mensaje: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.mensaje) {
      setError("Todos los campos son obligatorios.");
      setSuccess("");
      return;
    }

    // Validación básica de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor introduce un email válido.");
      setSuccess("");
      return;
    }

    // Aquí podrías enviar el formulario a una API o backend
    console.log("Formulario enviado:", form);
    setSuccess("Mensaje enviado correctamente.");
    setError("");
    setForm({ email: "", mensaje: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-xl bg-white shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Contacto</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="tucorreo@example.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Mensaje</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows="4"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-500 transition"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
