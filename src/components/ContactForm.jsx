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
      className=" bg-black p-4  space-y-4"
    >
      

      <div>
        <label className="  p-1 mt-2 block text-sm font-medium uppercase bg-neutral-800 text-gray-200">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-200 mt-1 placeholder:text-gray-400"
          placeholder="tucorreo@example.com"
        />
      </div>

      <div>
        <label className="p-1 block text-sm font-medium uppercase bg-neutral-800 text-gray-200">Mensaje</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className="w-full p-2 bg-gray-200 mt-1 placeholder:text-gray-400"
          rows="4"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="flex flex-col sm:flex-row gap-4 justify- mt-5 bg-neutral-800 text-white p-2 px-4 rounded-2xl hover:bg-neutral-500 transition duration-300"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
