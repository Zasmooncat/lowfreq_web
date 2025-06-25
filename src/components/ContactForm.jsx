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
      className="max-w-md  p-4  bg-black shadow-md space-y-4"
    >
      

      <div>
        <label className="block text-sm font-medium uppercase bg-gray-100 text-black">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border bg-black mt-1"
          placeholder="tucorreo@example.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium uppercase text-gray-300">Mensaje</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className="w-full p-2 border mt-1"
          rows="4"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="boton-elegante"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
