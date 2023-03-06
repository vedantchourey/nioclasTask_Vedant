import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styled from 'styled-components';

function QuestionDisplay() {
  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState('AreaUnderTheCurve_901');
  const [questionName, setQuestionName] = useState('AreaUnderTheCurve_901');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleQuestionChange = (newQuestionId) => {
    setQuestionName(newQuestionId)
    setQuestionId(newQuestionId);
    setSidebarOpen(false);
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`);
        const data = await response.json();
        const questionText = data[0].Question;
        const parts = questionText.split(/(\\\(|\\\))/); 
        const updatedParts = parts.map((part) => {
          if (part.startsWith('\\(') && part.endsWith('\\)')) {
                        return <MathJax>{part}</MathJax>;
          } else {
            return part;
          }
        });
        setQuestion(<MathJaxContext>{updatedParts}</MathJaxContext>);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestion();
  }, [questionId]);

  return (
    <div>
      <Button onClick={() => setSidebarOpen(true)}>Select Question</Button>
      <QuestionContainer>
      <QuestionName>{questionName}</QuestionName>
        {question && <QuestionText>{question}</QuestionText>}
      </QuestionContainer>
      <Drawer anchor="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List>
          <ListItem button onClick={() => handleQuestionChange('AreaUnderTheCurve_901')}>
            <ListItemText primary="Question 1" />
          </ListItem>
          <ListItem button onClick={() => handleQuestionChange('BinomialTheorem_901')}>
            <ListItemText primary="Question 2" />
          </ListItem>
          <ListItem button onClick={() => handleQuestionChange('DifferentialCalculus2_901')}>
            <ListItemText primary="Question 3" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default QuestionDisplay;





const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionName = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #444;
`;

const QuestionText = styled.div`
  font-size: 20px;
  line-height: 1.5;
  color: #666;
`;