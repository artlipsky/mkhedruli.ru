import { Accordion } from "@heroui/react";
import { FAQ_ITEMS } from "../../../data/faq";

// hydrated with client:visible, but the answers also land in the static HTML
// (verified against the build), so the FAQPage JSON-LD matches what crawlers read
export default function Faq() {
  return (
    <Accordion>
      {FAQ_ITEMS.map(({ q, a }) => (
        <Accordion.Item key={q} id={q}>
          <Accordion.Heading>
            {/* the accordion is set in text-sm while the prose around it is text-base
                on desktop; the trigger needs ! because HeroUI's own class sits on this
                same element and its stylesheet is imported after the utilities */}
            <Accordion.Trigger className="md:text-base!">
              {q}
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="text-muted md:text-base">{a}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
