export default function Header(props) {
  // PROPS
  const {theme,setTheme} = props
  
  return (
    <header>
      <nav
        className={`fixed top-0 ${
          theme
            ? "bg-gradient-to-r from-red-500 to-red-900"
            : "bg-gradient-to-r from-blue-500 to-blue-900"
        }  w-full h-16 flex justify-between items-center pl-4 pr-4 font-bold text-sm xl:text-xl lg:text-lg md:text-md sm:text-sm text-white z-50`}
      >
        <figure className="h-full">
          <a className="h-full flex justify-center items-center" href="/">
            TASK MANAGEMENT
          </a>
        </figure>
        <ul className="h-full flex justify-center items-center gap-1">
          <li className="w-10 h-10">
            <img
              onClick={() => setTheme(!theme)}
              src={
                theme ? "/public/images/header/daymode.png" : "/public/images/header/nightmode.png"
              }
              className="cursor-pointer bg-white hover:bg-white hover:bg-opacity-70 rounded-full p-1"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
