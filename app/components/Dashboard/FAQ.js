import React from "react";
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "Which database do we use?",
    answer: "We use Firebase Firestore, a NoSQL cloud database that simplifies the process of storing and syncing data for your app on a global scale. It offers real-time data synchronization, scalability, and easy integration with other Firebase services."
  },
  {
    question: "How do we ensure security?",
    answer: "Security is our top priority. We use Firebase Authentication for user authentication and Firestore security rules to enforce data access controls. Additionally, all data is transmitted over HTTPS to ensure encryption in transit."
  },
  {
    question: "How do we maintain speed and efficiency?",
    answer: "We optimize our database queries and use Firestore's powerful indexing features to ensure fast data retrieval. We also leverage caching mechanisms and implement efficient algorithms to minimize latency and improve overall performance."
  },
  {
    question: "How is our application scalable?",
    answer: "Our application is built on Firebase, which provides automatic scaling for both Firestore and hosting services. This ensures that our application can handle increased traffic and data load without compromising performance."
  },
  {
    question: "How can I contribute to the project?",
    answer: "We welcome contributions from the community. You can contribute by submitting pull requests on our GitHub repository, reporting issues, or suggesting new features. Please refer to our contribution guidelines for more details."
  },
  {
    question: "Where can I find the documentation?",
    answer: "Our comprehensive documentation is available on our official website. It includes guides, API references, and tutorials to help you get started and make the most out of our application."
  }
];

function FAQ() {
  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>
      <List>
        {faqs.map((faq, index) => (
          <ListItem key={index} disablePadding>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default FAQ;
