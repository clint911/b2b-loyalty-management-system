import { FormInput, FormGroup, FormCheckbox, Button, Form } from 'semantic-ui-react'
import { useState } from 'react'

export async function CreateToken() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('')
    const [initialSupply, setInitialSupply] = useState(1000000)
    const [ownerAddr, setOwnerAddr] = useState('')
    const [agreed, setAgreed] = useState(false)

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!agreed) {
            console.error('Please Consent to the Conditions for the form to be submitted')
            return;
        }
        try {
            const response = await fetch('/CreateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name, symbol, initialSupply, ownerAddr
                }),
            });

            //if form went through, clearing the form
            if (response.ok) {
                setName('')
                setSymbol('')
                setInitialSupply(1000000)
                setAgreed(false)
            } else {
                console.error('Error submitting form')
            }
        } catch (error) {
            console.error(error)
        }

    }
    async function handleAgreedChange(e: any) {
        setAgreed(e.target.checked)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup unstackable widths={2}>
                <FormInput label='Name' value={name} placeholder='Enter Name of Token' onChange={(e) => setName(e.target.value)} />
                <FormInput label='Symbol' value={symbol} placeholder='Enter Symbol of Token' onChange={(e) => setSymbol(e.target.value)} />
            </FormGroup>
            <FormGroup widths={2}>
                <FormInput label='InitialSupply' value={initialSupply} placeholder='Enter Initial Token Supply' onChange={(e) => setInitialSupply(Number(e.target.value))} />
                <FormInput label='OwnerAddress' value={ownerAddr} placeholder='Enter Address or phone no of owner' onChange={(e) => setOwnerAddr(e.target.value)} />
            </FormGroup>
            <FormCheckbox label='I Agree to the Ts & Cs and I know i m actually creating the token' checked={agreed} onChange={handleAgreedChange} />
            <Button type='submit' disabled={!agreed}>Submit</Button>
        </Form>
    )
}
