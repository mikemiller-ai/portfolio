import { Brain, Cloud, Database, Users, type LucideIcon } from "lucide-react";
import { expertiseGroups } from "@/data/expertise";
import { Reveal } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  database: Database,
  cloud: Cloud,
  users: Users,
};

export function ExpertiseGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {expertiseGroups.map((group, i) => {
        const Icon = icons[group.icon] ?? Brain;
        return (
          <Reveal key={group.title} delay={i * 60} as="article" className="card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill} className="pill">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
