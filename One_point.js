import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Header from "../components/Header";

const One_point =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">Xi</th>
                            <th width="30%">Xi+1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.X1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (x0) => {
        var x1,fX1,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            scope = {
                x:x0
            }
            fX1 = evaluate(Equation, scope)
            x1 = fX1;

            iter ++;
                ea = error(x0, x1);
                obj = {
                    iteration:iter,
                    X0:x0,
                    X1:x1,
                }
                data.push(obj)
                x0 = x1;
        }while(ea>e && iter<MAX)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
     
   
    const [html, setHtml] = useState(null); //ตัวตาราง Table
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }


    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        Calbisection(x0num);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
    }

    return (
        <div>
            <Header/>
            <Container>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X</Form.Label>
                        <input type="number" id="Xi" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
            </Container>   
            </div>
    )
}

export default One_point