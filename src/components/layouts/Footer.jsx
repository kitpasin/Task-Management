export default function Footer(props) {
  // PROPS
  const { theme, setTheme } = props;

  return (
    <footer
      className={`fixed bottom-0 ${
        theme
          ? "bg-gradient-to-r from-red-500 to-red-900"
          : "bg-gradient-to-r from-blue-500 to-blue-900"
      } w-full h-9 flex justify-center items-center font-bold text-sm xl:text-xl lg:text-lg md:text-md sm:text-sm text-white z-50`}
    >
      <p>&copy; 2023 | KITPASIN WATTANACHAIPON</p>
    </footer>
  );
}
