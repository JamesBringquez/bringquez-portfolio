import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectPage from "./pages/ProjectPage"
import ArkeStore from "./pages/projects/ArkeStore"
import ArkeCollections from "./pages/projects/arke/ArkeCollections"
import ArkeAbout from "./pages/projects/arke/ArkeAbout"
import { ArkeCartProvider } from "./pages/projects/arke/ArkeCartContext"
import ArkeStoreLayout from "./pages/projects/arke/ArkeStoreLayout"
import SeraDiscordBot from "./pages/projects/SeraDiscordBot"
import SeraLayout from "./pages/projects/sera/SeraLayout"
import SeraTermsOfService from "./pages/projects/sera/SeraTermsOfService"
import SeraPrivacyPolicy from "./pages/projects/sera/SeraPrivacyPolicy"
import PickleballLayout from "./pages/projects/pickleball/PickleballLayout"
import RallyPointPickleball from "./pages/projects/RallyPointPickleball"
import PickleballCourts from "./pages/projects/pickleball/PickleballCourts"
import PickleballEvents from "./pages/projects/pickleball/PickleballEvents"
import PickleballJoin from "./pages/projects/pickleball/PickleballJoin"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects/arke-clothing"
        element={
          <ArkeCartProvider>
            <ArkeStoreLayout />
          </ArkeCartProvider>
        }
      >
        <Route index element={<ArkeStore />} />
        <Route path="collections" element={<ArkeCollections />} />
        <Route path="about" element={<ArkeAbout />} />
      </Route>
      <Route path="/projects/sera-discord-bot" element={<SeraLayout />}>
        <Route index element={<SeraDiscordBot />} />
        <Route path="terms" element={<SeraTermsOfService />} />
        <Route path="privacy" element={<SeraPrivacyPolicy />} />
      </Route>
      <Route path="/projects/rally-point-pickleball" element={<PickleballLayout />}>
        <Route index element={<RallyPointPickleball />} />
        <Route path="courts" element={<PickleballCourts />} />
        <Route path="events" element={<PickleballEvents />} />
        <Route path="join" element={<PickleballJoin />} />
      </Route>
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}
