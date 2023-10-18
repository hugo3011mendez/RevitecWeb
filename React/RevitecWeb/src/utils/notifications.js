import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'react-toastify/dist/ReactToastify.css';

const ReactSwal = withReactContent(Swal)

export const swalert = (title, text, icon) => {
    ReactSwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: window.ENV.MainColor
    });
}

export const swalertConfirm = async (title, text) => {
    const result = await ReactSwal.fire({
        title: title,
        html: text,
        showCancelButton: true,
        confirmButtonColor: window.ENV.MainColor,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
}

export const swalertConnectionError = () => {
    swalert(
        "Error inesperado",
        "Este error podría deberse, entre otros motivos, a un fallo temporal de conexión con el servidor. Si el problema persiste, póngase en contacto con el administrador de la plataforma.",
        "error"
    );
}

export const notify = (message, type = 'info') => {
    toast(message,
        {
            type: type,
            theme: 'colored',
            hideProgressBar: true
        }
    );
}

export const notifyOperationResult = (result) => {
    const msg = result.text ? (
        <>
            <div>{result.message}</div>
            <div className="text-muted small">{result.text}</div>
        </>
    ) : result.message;
    notify(msg, result.level);
}
