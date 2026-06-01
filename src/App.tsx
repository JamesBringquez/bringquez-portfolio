import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectPage from "./pages/ProjectPage"
import ArkeStore from "./pages/projects/ArkeStore"
import SeraDiscordBot from "./pages/projects/SeraDiscordBot"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/arke-clothing" element={<ArkeStore />} />
      <Route path="/projects/sera-discord-bot" element={<SeraDiscordBot />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}
