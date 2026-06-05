import { motion } from "framer-motion"
import {
  GithubLogo,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo,
  type IconProps,
} from "@phosphor-icons/react"
import type { ComponentType } from "react"
import { personalInfo } from "../data/portfolio"
import VercelIcon from "./VercelIcon"

type IconComponent = ComponentType<IconProps>

export type DevSocial = {
  key: string
  href: string
  label: string
  subtitle: string
  icon?: IconComponent
  vercel?: boolean
}

export const devSocials: DevSocial[] = [
  {
    key: "github",
    href: personalInfo.social.github,
    label: "GitHub",
    subtitle: "github.com/JamesBringquez",
    icon: GithubLogo,
  },
  {
    key: "linkedin",
    href: personalInfo.social.linkedin,
    label: "LinkedIn",
    subtitle: "james-matthew-bringquez",
    icon: LinkedinLogo,
  },
  {
    key: "vercel",
    href: personalInfo.social.vercel,
    label: "Vercel",
    subtitle: "Deployed projects",
    vercel: true,
  },
]

export const personalSocials = [
  {
    key: "facebook",
    href: personalInfo.social.facebook,
    label: "Facebook",
    icon: FacebookLogo,
    weight: "fill" as const,
  },
  {
    key: "instagram",
    href: personalInfo.social.instagram,
    label: "Instagram",
    icon: InstagramLogo,
    weight: "fill" as const,
  },
]

type SocialLinksProps = {
  variant?: "hero" | "contact" | "footer"
  includePersonal?: boolean
  className?: string
}

const iconButtonClass: Record<NonNullable<SocialLinksProps["variant"]>, string> = {
  hero:
    "flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/25",
  contact:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-surface text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white",
  footer:
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white",
}

function renderIcon(social: DevSocial, size = 20) {
  if (social.vercel) return <VercelIcon size={size === 24 ? 20 : 18} />
  if (social.icon) return <social.icon size={size} weight="bold" />
  return null
}

export default function SocialLinks({
  variant = "hero",
  includePersonal = false,
  className = "",
}: SocialLinksProps) {
  const linkClass = iconButtonClass[variant]

  if (variant === "contact") {
    return (
      <div className={`space-y-3 ${className}`}>
        {devSocials.map((social) => (
          <a
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-ink/5 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent-muted/30"
          >
            <div className={iconButtonClass.contact}>{renderIcon(social, 24)}</div>
            <div>
              <p className="text-sm font-medium text-ink-subtle">{social.label}</p>
              <p className="font-semibold text-ink">{social.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {devSocials.map((social) => (
        <motion.a
          key={social.key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          whileHover={variant === "footer" ? { y: -4 } : undefined}
          className={linkClass}
        >
          {renderIcon(social)}
        </motion.a>
      ))}

      {includePersonal &&
        personalSocials.map((social) => (
          <motion.a
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={variant === "footer" ? { y: -4 } : undefined}
            className={linkClass}
          >
            <social.icon size={22} weight={social.weight} />
          </motion.a>
        ))}
    </div>
  )
}
