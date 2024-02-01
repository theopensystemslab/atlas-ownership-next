import BetaBanner from "../ui/BetaBanner"
import EntryPopout from "../ui/EntryPopout"
import Footer from "../ui/footer/Footer"
import Header from "../ui/header/Header"
import SubmitButton from "../ui/layout/SubmitButton"
import MapboxGlobeServerSide from "../ui/map/MapboxGlobeServerSide"
import Sidebar from "../ui/sidebar/Sidebar"

const MapLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
    <Sidebar />
    <EntryPopout>{children}</EntryPopout>
    <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
      <BetaBanner />
      <Header />
      <div className="w-full h-screen max-h-[85vh] relative">
        <MapboxGlobeServerSide />
        <SubmitButton />
      </div>
      <Footer />
    </div>
  </div>
)

export default MapLayout
