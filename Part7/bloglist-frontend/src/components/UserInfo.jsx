import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Typography, Box, List, ListItem, ListItemButton,  ListItemIcon, ListItemText } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

function UserInfo() {
  const id = useParams().id
  const users = useSelector (state => state.users)
  const user = users.find(u => u.id === id)
  if(!user) {return null}
  return (
    <div>
      <Typography variant="h5" marginTop= {5} marginBottom={1}>
        {user.name}
      </Typography>
      <Typography variant="h6" marginTop= {1} marginBottom={1}>
        Added blogs:
      </Typography>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List >
          {user.blogs.map(b => (
            <ListItem key={b.id} sx={{ m: -1 }}>
              <ListItemButton   component={Link} to={`/blogs/${b.id}`} >
                <ListItemIcon>  <ArticleIcon /> </ListItemIcon>
                <ListItemText primary={b.title} sx = {{ m:0 }}/>
              </ListItemButton>
            </ListItem>
          ))}

        </List>
      </Box>
    </div>
  )
}

export default UserInfo