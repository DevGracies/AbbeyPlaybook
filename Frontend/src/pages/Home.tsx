import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookIcon from "@mui/icons-material/Book";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShareIcon from "@mui/icons-material/Share";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const GlobalReset = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; font-family: Inter, Roboto, "Helvetica Neue", Arial; }
  a { color: inherit; text-decoration: none; }
`;

const DEEP_BLUE = "#0A1D37";
const RED = "#D72638";
const SOFT_BG = "#F6F8FB";

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${SOFT_BG} 0%, #ffffff 100%);
  color: ${DEEP_BLUE};
  display: flex;
  flex-direction: column;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 520px;
  gap: 2.5rem;
  align-items: center;
  width: 100%;
  padding: 6rem 5% 4rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: 3.25rem 4% 2rem;
  }
`;

const HeroLeft = styled.div`
  max-width: 720px;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(10,29,55,0.06);
  color: ${DEEP_BLUE};
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const Heading = styled.h1`
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.02;
  color: ${DEEP_BLUE};
  margin-bottom: 1rem;
`;

const Lead = styled.p`
  color: rgba(10,29,55,0.8);
  font-size: 1.05rem;
  margin-bottom: 1.6rem;
  max-width: 58ch;
`;

/* CTA */
const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const PrimaryCTA = styled(motion(Link))`
  background: linear-gradient(90deg, ${DEEP_BLUE}, ${RED});
  color: white;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 10px 30px rgba(10,29,55,0.12);
`;

const SecondaryCTA = styled(Link)`
  color: ${DEEP_BLUE};
  font-weight: 600;
  padding: 0.55rem;
`;

const MockupWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MockupCard = styled(motion.div)`
  width: 100%;
  max-width: 520px;
  background: linear-gradient(180deg,#ffffff 0%, #fbfdff 100%);
  border-radius: 16px;
  box-shadow: 0 30px 60px rgba(10,29,55,0.08);
  padding: 1.25rem;
  border: 1px solid rgba(10,29,55,0.04);
`;

const MockupHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-bottom: .4rem;
  margin-bottom: .6rem;
  border-bottom: 1px dashed rgba(10,29,55,0.06);
`;

const MockupTitle = styled.div`
  display:flex;
  gap: .6rem;
  align-items:center;
  font-weight:700;
  color: ${DEEP_BLUE};
`;

const Checklist = styled.div`
  display:flex;
  gap: 1rem;
  align-items:flex-start;
`;

const CheckColumn = styled.div`
  flex: 1;
`;

const NoteColumn = styled.div`
  flex: 0.9;
  display:flex;
  flex-direction:column;
  gap: .7rem;
`;

const CheckItem = styled(motion.div)`
  display:flex;
  gap: .75rem;
  align-items:center;
  padding: .55rem;
  background: linear-gradient(90deg, rgba(10,29,55,0.02), rgba(10,29,55,0.01));
  border-radius: 10px;
`;

const NoteCard = styled(motion.div)`
  background: #fff;
  padding: .65rem;
  border-radius: 10px;
  border: 1px solid rgba(10,29,55,0.04);
  box-shadow: 0 8px 20px rgba(10,29,55,0.03);
`;

const Features = styled.section`
  display:flex;
  gap: 1rem;
  padding: 2.25rem 5%;
  justify-content:center;
  align-items:flex-start;
  flex-wrap:wrap;
`;

const Feature = styled(motion.div)`
  background: white;
  min-width: 220px;
  max-width: 300px;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 12px 30px rgba(10,29,55,0.05);
  display:flex;
  gap: .8rem;
  align-items:flex-start;
`;

const CTABar = styled.div`
  margin-top: 2.2rem;
  padding: 2.2rem 5%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap: 1rem;
  background: linear-gradient(90deg, rgba(10,29,55,0.02), rgba(183,28,28,0.02));
  border-top: 1px solid rgba(10,29,55,0.03);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  @media(max-width:720px){ flex-direction:column; align-items:stretch; text-align:center; }
`;

const IconWrap = styled.div`
  width:40px;height:40px;border-radius:10px;background:linear-gradient(180deg,rgba(10,29,55,0.06), rgba(183,28,28,0.03));
  display:flex;align-items:center;justify-content:center;color:${DEEP_BLUE};
`;

const listItem = {
  hidden: { opacity: 0, x: -8 },
  show: (i = 1) => ({ opacity: 1, x: 0, transition: { delay: i * 0.12 } }),
};

export default function Home(){
  const checklist = [
    { id: 1, text: "Daily standup checklist" },
    { id: 2, text: "Onboarding steps for new hires" },
    { id: 3, text: "Release readiness checklist" },
  ];

  const notes = [
    { id: "n1", title: "Tips", body: "Keep PRs small and descriptive." },
    { id: "n2", title: "Resources", body: "README • Templates • Design tokens" },
  ];

  return (
    <>
      <GlobalReset />
      <Page>
        <Hero>
          <HeroLeft>
            <Eyebrow>
              <IconWrap><BookIcon sx={{ fontSize: 18 }} /></IconWrap>
              Playbooks that travel with you
            </Eyebrow>

            <Heading>
              “Your role, <span style={{ color: RED }}>your playbook.</span>
            </Heading>

            <Lead>
              Every employee has a unique way of working. AbbeyPlaybook helps you:
            </Lead>

            <ul style={{ marginTop: 8, marginBottom: 18, color: "rgba(10,29,55,0.85)", lineHeight: 1.6 }}>
              <li>Document your processes, workflows, and tools.</li>
              <li>Capture best practices and lessons learned.</li>
              <li>Build a living guide that grows with you.</li>
            </ul>

            <Lead style={{ marginTop: 8, maxWidth: 680 }}>
              From personal guide to team knowledge. When others follow your playbook,
              they gain insight into your role and learn from your expertise. Share knowledge, save time, and help teammates succeed.
            </Lead>

            <CTAGroup style={{ marginTop: 18 }}>
              <PrimaryCTA
                to="/playbooks"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Create My Playbook"
              >
                <PlayArrowIcon fontSize="small" />
                Create My Playbook
              </PrimaryCTA>

              <SecondaryCTA to="/explore">See examples</SecondaryCTA>
            </CTAGroup>
          </HeroLeft>

          <MockupWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <MockupCard>
              <MockupHeader>
                <MockupTitle>
                  <CheckCircleIcon sx={{ color: RED }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>Marketing Onboarding</div>
                    <div style={{ fontSize: 12, color: "rgba(10,29,55,0.5)" }}>Updated 3 days ago • 12 steps</div>
                  </div>
                </MockupTitle>
                <div style={{ display: "flex", gap: 8 }}>
                  <IconWrap style={{ width: 36, height: 36 }}><ShareIcon sx={{ fontSize: 18 }} /></IconWrap>
                  <IconWrap style={{ width: 36, height: 36 }}><RocketLaunchIcon sx={{ fontSize: 18 }} /></IconWrap>
                </div>
              </MockupHeader>

              <Checklist style={{ marginTop: 12 }}>
                <CheckColumn>
                  {checklist.map((c, i) => (
                    <CheckItem
                      key={c.id}
                      variants={listItem}
                      initial="hidden"
                      animate="show"
                      custom={i + 1}
                      style={{ marginBottom: 10 }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(180deg,#fff,#fbfbff)", display: "grid", placeItems: "center", border: "1px solid rgba(10,29,55,0.06)" }}>
                        <CheckCircleIcon sx={{ color: i === 0 ? RED : "rgba(10,29,55,0.38)" , fontSize: 20 }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.text}</div>
                        <div style={{ fontSize: 13, color: "rgba(10,29,55,0.55)" }}>Assigned to: Jane • Est: 15m</div>
                      </div>
                    </CheckItem>
                  ))}
                </CheckColumn>

                <NoteColumn>
                  {notes.map((n) => (
                    <NoteCard key={n.id} whileHover={{ scale: 1.02 }}>
                      <div style={{ fontWeight: 700 }}>{n.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(10,29,55,0.62)" }}>{n.body}</div>
                    </NoteCard>
                  ))}

                  <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, fontSize: 13, color: "rgba(10,29,55,0.6)" }}>Resource links</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ fontSize: 12, padding: "6px 8px", background: "rgba(10,29,55,0.04)", borderRadius: 8 }}>README.md</div>
                      <div style={{ fontSize: 12, padding: "6px 8px", background: "rgba(10,29,55,0.04)", borderRadius: 8 }}>Template</div>
                    </div>
                  </div>
                </NoteColumn>
              </Checklist>
            </MockupCard>
          </MockupWrapper>
        </Hero>

        <Features>
          <Feature whileHover={{ y: -6 }}>
            <IconWrap><BookIcon /></IconWrap>
            <div>
              <div style={{ fontWeight: 800 }}>Document & organize</div>
              <div style={{ fontSize: 13, color: "rgba(10,29,55,0.65)" }}>Write step-by-step processes that anyone can follow.</div>
            </div>
          </Feature>

          <Feature whileHover={{ y: -6 }}>
            <IconWrap><CheckCircleIcon /></IconWrap>
            <div>
              <div style={{ fontWeight: 800 }}>Checklists & templates</div>
              <div style={{ fontSize: 13, color: "rgba(10,29,55,0.65)" }}>Reusable checklists speed up onboarding and delivery.</div>
            </div>
          </Feature>

          <Feature whileHover={{ y: -6 }}>
            <IconWrap><ShareIcon /></IconWrap>
            <div>
              <div style={{ fontWeight: 800 }}>Share & follow</div>
              <div style={{ fontSize: 13, color: "rgba(10,29,55,0.65)" }}>Follow others' playbooks to learn faster.</div>
            </div>
          </Feature>
        </Features>

        <CTABar>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Your role deserves a playbook.</div>
            <div style={{ color: "rgba(10,29,55,0.6)" }}>Start yours today and help others grow.</div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <PrimaryCTA to="/playbooks" whileHover={{ scale: 1.02 }}>Create My Playbook</PrimaryCTA>
            <SecondaryCTA to="/explore">Explore Playbooks</SecondaryCTA>
          </div>
        </CTABar>
      </Page>
    </>
  );
}
