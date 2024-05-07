import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";

export default function HeaderPage() {
  return (
    <div
      style={{
        boxShadow:
          "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
      }}
    >
      <Header />
      <NavBar />
    </div>
  );
}
