import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import agent from "../../app/api/agent"
import { useState } from "react";
 
function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => { console.log('should not see') })
      .catch((ex) => { setValidationErrors(ex) });
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">Errors for testing </Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(
          (ex) => { console.log(ex) })}>400 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(
          (ex) => { console.log(ex) })}>401 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(
          (ex) => { console.log(ex) })}>404 Error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(
          (ex) => { console.log(ex) })}>500 Error</Button>
        <Button variant="contained" onClick={getValidationError}>Validataion Error</Button>
      </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert severity="error">
          <AlertTitle>Validation Error {validationErrors}</AlertTitle>
          <List>
            {validationErrors.map((error) => {
              return (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Alert>}
    </Container>
  )
}

export default AboutPage