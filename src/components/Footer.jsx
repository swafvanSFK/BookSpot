
function Footer() {
  return (
    <footer className="bg-[#000000cd] text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold">BookStore</h2>
        <p className="text-sm mt-2">© {new Date().getFullYear()} BookStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;