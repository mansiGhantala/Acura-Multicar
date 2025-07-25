
import { FaMapMarkerAlt } from "react-icons/fa";

const services = [
  "Car Modulas & Bodykits",
  "Accessories & Parts Sales",
  "Full Diagnostic & ECU Repair",
  "Luxury & Truck Services",
  "Top‑brand Maintenance",
];

const images = [
  "/images/about/workshop.jpg",
  "/images/about/tools.webp",
  "/images/about/service.jpg",
  "/images/about/luxury.jpg",
];

const About = () => (
  <main className="bg-white text-[#1A1A1A]">
    <section
      className="relative h-64 sm:h-80 md:h-[380px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/about/workshop.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#415D8A]/70 flex items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center px-4">
          About Acura Multicar Workshop
        </h1>
      </div>
    </section>

    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <p className="text-md sm:text-lg leading-relaxed">
          At <strong>Acura Multicar Workshop</strong>, we specialise in premium
          automotive services—from <strong>ECU testing &amp; repair</strong> to
          genuine body modules, accessories and diagnostics for cars, buses,
          trucks, and luxury vehicles. Our certified technicians deliver
          excellence using top‑brand components and state‑of‑the‑art tools.
        </p>

        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#415D8A] text-lg mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="py-12 px-4 bg-[#D0E1F5]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Workshop ${i + 1}`}
            loading="lazy"
            className="w-full h-56 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>

    <section className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-[#415D8A]">
          Our Commitment to Quality
        </h2>

        <p>
          Our workshop is equipped with the latest diagnostic equipment and
          luxury‑grade tools. We promise transparent pricing, honest guidance,
          and meticulous care—helping you drive away with confidence.
        </p>

        <blockquote className="italic border-l-4 border-[#ABBCDA] pl-4 text-[#415D8A]">
          “From aftermarket parts to luxury service, we ensure every ride is
          safe, stylish, and smooth.”
        </blockquote>
      </div>
    </section>

    <footer className="py-12 px-4 bg-[#415D8A] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <p className="text-lg font-semibold">Visit Us</p>
        <p>
          Acura Multicar Workshop ,near fountain hotel, simada gam,
          <br />
          Surat, Gujarat, India
        </p>
        <p>
          📞{" "}
          <a href="tel:+919687553179" className="underline hover:text-[#D0E1F5]">
            +91 98765 43210
          </a>{" "}
          • ✉️{" "}
          <a
            href="mailto:acuramuticar@gmail.com"
            className="underline hover:text-[#D0E1F5]"
          >
            acuramulticar@gmail.com
          </a>
        </p>
        <div className="space-x-4">
          <a href="#" className="underline hover:text-[#D0E1F5]">
            Facebook
          </a>
          <a href="#" className="underline hover:text-[#D0E1F5]">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  </main>
);

export default About;
