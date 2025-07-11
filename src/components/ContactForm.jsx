import { useState } from "react";

const ContactForm = () => {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/zasmomoxipol@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      setShowToast(true);
      setFormData({ email: "", message: "" });

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error enviando el formulario", error);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-4 space-y-4"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />

        <div>
          <label className="p-1 mt-2 block text-sm font-medium uppercase bg-neutral-800 text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 text-black mt-1 placeholder:text-gray-400"
            placeholder="tucorreo@example.com"
          />
        </div>

        <div>
          <label className="p-1 block text-sm font-medium uppercase bg-neutral-800 text-gray-200">
            Mensaje
          </label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 text-black mt-1 placeholder:text-gray-400"
            rows="4"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button
          type="submit"
          className="flex flex-col sm:flex-row gap-4 justify-center mt-5 bg-neutral-800 text-white p-2 px-4 rounded-2xl hover:bg-neutral-500 transition duration-300"
        >
          Enviar
        </button>
      </form>

      {showToast && (
        <div className="absolute top-0 right-1/2 mt-2 mr-2 bg-green-500 text-white text-sm px-4 py-2 rounded shadow-lg transition-opacity duration-500">
          ¡Mensaje enviado con éxito!
        </div>
      )}
    </div>
  );
};

export default ContactForm;
