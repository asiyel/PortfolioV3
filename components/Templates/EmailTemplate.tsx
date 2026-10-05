import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

const ink = "#111111";
const cream = "#F3F0EC";

interface EmailTemplateProps {
  name: string;
  email: string;
  project: string;
}

export default function EmailTemplate({
  name,
  email,
  project,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New note from ${name} — ${project.slice(0, 90)}`}</Preview>
      <Body
        style={{
          backgroundColor: cream,
          fontFamily: "Helvetica, Arial, sans-serif",
          margin: 0,
        }}
      >
        <Container
          style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 40px" }}
        >
          <Text
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8a8a86",
              margin: "0 0 8px",
            }}
          >
            Portfolio · Leave a Note
          </Text>

          <Section
            style={{ backgroundColor: ink, borderRadius: 24, padding: "32px" }}
          >
            <Heading
              style={{
                color: cream,
                fontSize: 24,
                fontWeight: 600,
                margin: "0 0 24px",
              }}
            >
              New message from {name}
            </Heading>

            <Section style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(243,240,236,0.5)",
                  margin: "0 0 4px",
                }}
              >
                From
              </Text>
              <Text style={{ fontSize: 15, color: cream, margin: 0 }}>
                {name} ·{" "}
                <Link
                  href={`mailto:${email}`}
                  style={{ color: cream, textDecoration: "underline" }}
                >
                  {email}
                </Link>
              </Text>
            </Section>

            <Section
              style={{
                backgroundColor: "rgba(243,240,236,0.06)",
                border: "1px solid rgba(243,240,236,0.15)",
                borderRadius: 16,
                padding: "20px",
                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(243,240,236,0.5)",
                  margin: "0 0 8px",
                }}
              >
                Their Project
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: "1.6",
                  color: cream,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {project}
              </Text>
            </Section>

            <Link
              href={`mailto:${email}`}
              style={{
                display: "inline-block",
                backgroundColor: cream,
                color: ink,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: 999,
              }}
            >
              Reply to {name.split(" ")[0] || name}
            </Link>
          </Section>

          <Hr
            style={{ borderColor: "rgba(17,17,17,0.1)", margin: "24px 0 12px" }}
          />
          <Text
            style={{
              fontSize: 12,
              color: "#8a8a86",
              textAlign: "center",
              margin: 0,
            }}
          >
            Sent from the contact form at your portfolio.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
