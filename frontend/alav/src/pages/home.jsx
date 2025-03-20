import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap:'4rem', marginTop: '4rem' }}>
        <Card sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
          <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="m389.676 102.627l-2.294-17.293H333.73l-2.3 17.282l-1.433 10.707l-2.817 1.629l-2.524 1.664l-9.49-4.039l-15.293-6.505l-8.257 15.075l-10.265 18.741l-8.272 15.101l13.001 10.76l8.032 6.645l-.025.311a64 64 0 0 0-.072 2.981l.072 2.957l.044.417l-8.049 6.669l-13.009 10.759l8.274 15.105l10.271 18.751l8.255 15.073l15.293-6.502l9.471-4.037l2.634 1.74l2.726 1.553l1.408 10.577l2.294 17.291h53.649l2.301-17.281l1.416-10.728l2.834-1.608l2.507-1.685l9.505 4.058l15.295 6.505l8.257-15.075l10.265-18.74L448 196.384l-13.001-10.76l-8.03-6.645l.021-.311q.073-1.51.072-2.982l-.07-2.956l-.042-.457l8.051-6.64L448 154.873l-8.272-15.1l-10.267-18.745l-8.257-15.072l-15.291 6.502l-9.488 4.017l-2.617-1.721l-2.743-1.572zm-27.271 113.216c20.995 0 38.013-17.979 38.013-40.157S383.4 135.53 362.405 135.53s-38.013 17.978-38.013 40.156s17.018 40.157 38.013 40.157m-181.804 47.412l-2.293-17.294h-53.652l-2.301 17.281l-1.433 10.708l-2.816 1.629l-2.525 1.664l-9.489-4.038l-15.293-6.505l-8.257 15.075l-10.266 18.741l-8.272 15.101l13 10.76l8.033 6.644l-.023.311a63 63 0 0 0-.073 2.982l.071 2.955l.045.418l-8.05 6.67L64 357.115l8.273 15.105l10.27 18.751l8.256 15.073l15.292-6.501l9.471-4.038l2.634 1.741l2.726 1.552l1.41 10.577l2.294 17.292h53.648l2.301-17.282l1.416-10.728l2.833-1.608l2.508-1.684l9.506 4.057l15.293 6.506l8.257-15.075l10.266-18.741l8.272-15.101l-13.001-10.76l-8.03-6.644l.021-.311q.072-1.512.073-2.982l-.071-2.956l-.042-.457l8.051-6.64l12.999-10.76l-8.272-15.099l-10.267-18.746l-8.256-15.073l-15.292 6.502l-9.488 4.018l-2.617-1.721l-2.743-1.572zm-27.27 113.216c20.994 0 38.013-17.979 38.013-40.157c0-22.179-17.019-40.157-38.013-40.157c-20.995 0-38.014 17.978-38.014 40.157s17.019 40.157 38.014 40.157M448 384H256v42.667h192zM64 85.334h192V128H64zm192 127.999h-42.667V256H256z" clip-rule="evenodd"/></svg>
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                Máquinas
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="small" color="primary" variant="contained" startIcon={<FormatListBulletedIcon />} onClick={() => navigate('/listado-maquina')}>
              Listado
            </Button>
            <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />}>
              Agregar
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
          <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="currentColor"><path d="M15.319 13.215c.683-2.152 2.41-3.932 4.681-4.907V11a1 1 0 1 0 2 0V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 1 0 2 0V8.308c2.304.989 4.047 2.805 4.71 4.999c-.257.208-.686.46-1.355.704c-1.492.544-3.995.989-7.881.989c-2.799 0-5.048-.436-6.565-.99c-.733-.267-1.26-.549-1.59-.795"/><path fill-rule="evenodd" d="M32.04 15.89c.885-.324 1.583-.712 2.079-1.158c.567.543.881 1.14.881 1.768c0 1.198-1.144 2.287-3.01 3.093q.01.202.01.407a8 8 0 1 1-15.99-.407C14.144 18.787 13 17.698 13 16.5c0-.65.336-1.267.941-1.824l.113.09c.544.421 1.288.802 2.17 1.123c1.771.647 4.259 1.111 7.25 1.111c4.008 0 6.769-.455 8.566-1.11m-14.034 4.384a6 6 0 0 0 11.988 0C28.27 20.734 26.21 21 24 21s-4.27-.267-5.994-.726M6 42h21V30.5L25 32v3.897A4 4 0 0 1 24 36c-.475 0-.795-.05-1-.103v-3.675l-4.647-3.614C12.52 29.728 6 32.338 6 36zm7-2h8v-4.82l-6.525 1.088l1.876-5.158A31 31 0 0 0 13 32.18zm-5 0h3v-6.921l-.074.039c-1.064.564-1.842 1.139-2.332 1.68C8.114 35.33 8 35.723 8 36z" clip-rule="evenodd"/><path d="M32.57 25.65c.578-.59 1.38.005 1.204.812l-.026.118a2.817 2.817 0 1 0 5.504 0l-.026-.118c-.176-.807.626-1.401 1.204-.811A5.48 5.48 0 0 1 42 29.499a5.5 5.5 0 0 1-2.583 4.664c-.279.174-.417.508-.417.837v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-5c0-.329-.138-.663-.417-.837A5.5 5.5 0 0 1 31 29.499c0-1.498.599-2.857 1.57-3.848"/></g></svg>
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                Técnicos
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="small" color="primary" variant="contained" startIcon={<FormatListBulletedIcon />}>
              Listado
            </Button>
            <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />}>
              Agregar
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
          <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.354 4.146a.5.5 0 0 0-.707 0l-1.413 1.412l-.397-.362a.5.5 0 0 0-.674.738l.75.685a.5.5 0 0 0 .69-.016l1.75-1.75a.5.5 0 0 0 0-.707m0 5.708a.5.5 0 0 0-.707-.708l-1.413 1.412l-.397-.362a.5.5 0 0 0-.674.738l.75.685a.5.5 0 0 0 .69-.015zM6.5 8a.5.5 0 0 0 0 1H9a.5.5 0 0 0 0-1zM6 13.5a.5.5 0 0 0 .5.5H9a.5.5 0 0 0 0-1H6.5a.5.5 0 0 0-.5.5"/></svg>
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                Tareas
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="small" color="primary" variant="contained" startIcon={<FormatListBulletedIcon />}>
              Listado
            </Button>
            <Button size="small" color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />}>
              Agregar
            </Button>
          </CardActions>
        </Card>
      </div>
    );
}
  
export default Home;