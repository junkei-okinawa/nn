import { Box, Button, Container, Stack } from '@mui/material';
import PyScript, { PyConfig, PyRepl, PyScriptProvider } from 'pyscript-react';

export default function Home() {

  return (
    <>
      <Container maxWidth="lg" sx={{ height: 'auto' }}>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
            height: '100%'
          }}
        >
          <Box sx={{ width: '100%' }} >
            <PyScriptProvider>
              <PyConfig>
                packages = ["numpy","matplotlib", "pandas", "scikit-learn"]
              </PyConfig>
              <PyRepl />
            </PyScriptProvider>
          </Box>
        </Box>
      </Container>
      <Box sx={{ height: '80px' }} />{/* 画面下部のカードがfooterに隠れてしまうので、底上げ用のBoxを設置 */}
    </>
  );
}
