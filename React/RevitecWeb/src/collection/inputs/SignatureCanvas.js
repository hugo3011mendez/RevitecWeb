import React from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { BsButton } from '../bootstrap/BootstrapComponents';

/**
 * Signature canvas with clear and submit buttons.
 * Props:
 * - width
 * - height
 * - onSign: It is triggered when the sign button is pressed. An argument is passed:
 *       base64 string of a PNG image of the signature or null if the canvas is empty
 * - isSaving: If true, sign button is disabled and a loading animation is shown inside.
 * - clearText: Text of the clear button.
 * - signText: Text of the sign button.
 */
export default function SignatureCanvas(props) {

    // get props
    const { width, height, className, onSign, isSaving,
        clearText, signText,
        ...otherProps } = props;

    // handle canvas
    let canvasRef = {};
    const canvasIsEmpty = () => canvasRef.isEmpty();
    const canvasGetImage = () => canvasRef.getCanvas().toDataURL().substring(22);
    const clear = () => canvasRef.clear();
    const sign = () => onSign(canvasIsEmpty() ? null : canvasGetImage());

    // render
    return <>
        <div className="signWrapper">
            <ReactSignatureCanvas
                ref={(ref) => canvasRef = ref}
                minDistance={1}
                {...otherProps}
                canvasProps={{
                    width: width,
                    height: height,
                    className: className,
                    style: { border: '.1rem solid #ccc', borderRadius: '.3rem' }
                }}
            />
        </div>
        <div className="d-flex gap-2" style={{ width: width + 'px', margin: 'auto' }}>
            <BsButton variant="secondary" className="flex-grow-1" onClick={clear}>{clearText}</BsButton>
            <BsButton className="flex-grow-1" onClick={sign} isLoading={isSaving}>{signText}</BsButton>
        </div>
    </>;
}

SignatureCanvas.defaultProps = {
    clearText: "Limpiar",
    signText: "Firmar"
}
