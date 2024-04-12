import React, { useEffect, useState } from "react";
import './Products.css';
import axios from 'axios';



function Products() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTI5MTc4OTAsImV4cCI6MTcxMjkyMTQ5MCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQHN0YXJidWNrcy5jb20ifQ.WXkAi0LRCri9st-vAonMZyWxbEb22_zQqv5k01CEQhekn1YHm_zqbg3ZxKLq6pXM3BimQcGUux5dskXDugo-dOi9mNdB38PXa7woxZtEphhnHD3uuM32cG-_7ikrSr8ijvuz0vKRZZ7H1GWt-NPTMe2jNKRjYYkdjBZ-ArDfj6AlKfuo2If1rVlGTbL6PViXX6bvnGJjKpi1T_OuiohomFBQmsKfI1vwpoZXEui4CzQE0kZ1HeRell1eQpNyIGUAHaT4A8-KtlaDBoTWo9RVKVicI6bp06ghWIJgeksyWzFCrxmuZCzL8a-Y-D8co-AuWxqYMPNyLSoMsIYvXMVWoGbaIj4PRK-EvTcJ9kHNbtrcQmPEJsPDuYJ-uy-HF36ynXvms5S2jnHS7c76Q77skybfwZLH3BizfIu11ufW68op1K0nko84u5oWU_kubSNuV1apQJx0GAvcYGV-1WFVyR77lKDy9pV1USjPtpofiTWjfOo_u6seWr7QNDwCuiXLlT6ZfRdfnn34bCvpCM6OsVfx-kYe_hw1ITgY5FW3_BjPfTLbmHV-Wbvm7xh8soh0FpTAAiSoVTA1grECzoeb7n317oEyvM3fKUPs4E1frGwcluhWZ4400JGioiVVPXa3IRPiyOUdqj50ScgaO4olyMoPXQVnA5Qj4_clPp2pFlY'
        };
        axios.get("http://localhost:8000/api/products", { headers }).then((data) => {
            console.log(data);
            setPost(data.data);
        });
    }, []);

    return (
        <div className="product">
            Products
            {post.map((data) => {
                return (
                    <ul className="products" key={data.id}>
                        <li>{"id: " + data.id}</li>
                        <li>{"Titre: " + data.name}</li>
                        <li>{"Prix: " + data.price}</li>
                    </ul>
                );
            })}
        </div>
    );
}
export default Products;