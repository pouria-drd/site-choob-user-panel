const SaveIcon = ({ size = undefined, className = 'w-6 h-6' }: IconProp) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={!size ? className : undefined}
            viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.615 4h10.962L20 7.423v4.53q-.244-.084-.497-.098q-.253-.015-.503.003V7.844L16.156 5H5.616q-.27 0-.443.173T5 5.615v12.77q0 .269.173.442t.442.173h5.231v1zM5 5v14zm8.23 17v-2.21l5.333-5.307q.149-.148.308-.2q.16-.052.32-.052q.165 0 .334.064t.298.193l.925.945q.123.148.188.307q.064.16.064.32t-.062.322q-.061.162-.19.31L15.44 22zm6.885-5.94l-.925-.945zm-6 5.055h.95l3.468-3.473l-.47-.475l-.455-.488l-3.493 3.486zm3.948-3.948l-.455-.488l.925.963zM6.77 9.77h7.423v-3H6.77zM12 16.54q.179 0 .338-.039q.16-.038.32-.135l1.169-1.144q.096-.165.135-.332q.038-.166.038-.35q0-.827-.587-1.414q-.586-.587-1.413-.587t-1.413.587Q10 13.712 10 14.538t.587 1.414q.586.586 1.413.586"
            />
        </svg>
    );
};

export default SaveIcon;
