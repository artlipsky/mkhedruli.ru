import { Accordion } from "@heroui/react";
import { FAQ_ITEMS } from "../../../data/faq";

export default function Faq() {
  return (
    <Accordion>
      {FAQ_ITEMS.map(({ q, a }) => (
        <Accordion.Item key={q} id={q}>
          <Accordion.Heading>
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
