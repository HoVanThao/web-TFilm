import { RiMovie2Line } from "react-icons/ri";
import moment from 'moment'
import 'moment/locale/vi';

const Empty = ({ message }) => {
    return (
        <div className="flex-colo w-full py-4 px-4 rounded-lg border border-border bg-main gap-4">
            <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMainn text-4xl">
                <RiMovie2Line />
            </div>
            <p className="text-text text-sm ">{message}</p>
        </div>
    )
};

export default Empty;

export const shortUppercaseId = (id) => {
    return id.slice(0, 8).toUpperCase();
}

// export const DateFormat = (date) => {
//     moment.locale('vi');
//     return moment(date).format("LL");
// }

export const DateFormat = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}