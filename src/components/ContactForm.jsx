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
      await fetch("https://formsubmit.co/ajax/mayaisaac@gmail.com", {
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
    <div className="relative w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />

        <div className="flex flex-col text-left">
          <label className="text-sm font-semibold tracking-wide text-neutral-300 mb-2 pl-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-neutral-600"
            placeholder="tucorreo@example.com"
          />
        </div>

        <div className="flex flex-col text-left">
          <label className="text-sm font-semibold tracking-wide text-neutral-300 mb-2 pl-1">
            Mensaje
          </label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-neutral-600 resize-none"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-4 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-green-600 hover:to-green-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          Enviar Mensaje
        </button>
      </form>

      {showToast && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-black font-bold text-sm px-6 py-3 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all animate-bounce">
          ¡Mensaje enviado con éxito!
        </div>
      )}
    </div>
  );
};

export default ContactForm;
