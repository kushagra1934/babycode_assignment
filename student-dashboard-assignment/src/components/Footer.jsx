// src/components/Footer.jsx
export default function Footer({ theme = "dark" }) {
  return (
    <footer
      className={`w-full py-4 px-6 mt-10 text-center text-sm ${
        theme === "dark"
          ? "bg-gray-800 text-gray-400"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      <p>
        &copy; {new Date().getFullYear()} Student Dashboard. All rights
        reserved.
      </p>
      <p>Built with ❤️ for BabyCode using React + Firebase.</p>
    </footer>
  );
}
