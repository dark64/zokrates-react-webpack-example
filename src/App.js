import React, { useEffect, useState } from 'react';
import { initialize } from 'zokrates-js';

const App = () => {

    const [state, setState] = useState({});

    useEffect(() => {
        initialize().then((provider) => {

            // Compilation
            let artifacts = provider.compile("def main(private field a) -> (field): return a", "main", () => {});

            // Generate setup keypair
            let keypair = provider.setup(artifacts.program);

            // Computation
            let computationResult = provider.computeWitness(artifacts, ["123"]);

            // Export verifier
            let verifier = provider.exportSolidityVerifier(keypair.vk, true);

            // Generate proof
            let proof = provider.generateProof(artifacts.program, computationResult.witness, keypair.pk);

            setState({ artifacts, keypair, computationResult, proof, verifier });
        });
    }, []);

    return (
        <div id="app">
            <main role="main">
                <h1>Zokrates React</h1>
                <pre>
                    <code>
                        {JSON.stringify(state, null, 2)}
                    </code>
                </pre>
            </main>
        </div>
    );
}

export default App;