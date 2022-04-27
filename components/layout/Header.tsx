import {Navbar} from "../ui";

export const Header = () => {
  return (
    <header className="fixed z-[999] top-0 left-0 w-full">
      <div className="absolute top-0 left-0 w-full px-4 pt-4 pb-2 border-[#d9d9d9]">
        <Navbar />
      </div>
    </header>
  );
};
