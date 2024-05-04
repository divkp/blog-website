import { Button,Table,TableBody,TableHead,TableCell,TableRow,styled } from "@mui/material"
import categories from "./data";
import {Link,useSearchParams} from "react-router-dom";

const StyledTable=styled(Table)`
 border:1px solid rgba(224,224,224,1);
`;

const StyledButton=styled(Button)`
 margin:20px;
 width:85%;
 background:#6495ED;
 color:#fff;
`

const Styledlink=styled(Link)`
  text-decoration:none;
  color:inherit,
`
const Categories=()=>{
    
    const [SearchParams]=useSearchParams();
    const category=SearchParams.get('category');

    return (
      <>
        <Styledlink to={`/create?category=${category}`}>
          <StyledButton variant="contained">CREATE BLOG</StyledButton>
        </Styledlink>

        <StyledTable>
          <TableHead>
            <TableRow>
              <Styledlink to="/">
                <TableCell>All Categories</TableCell>
              </Styledlink>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Styledlink to={`/?category=${category.type}`}>
                    {category.type}
                  </Styledlink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </>
    );
    
}

export default Categories;