export function TableComponent({ columns, rows, styleClass }) {
    return (
        <table className={styleClass}>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.id}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.length > 0 ? (
                    rows.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map(col => col.accessor).map(acc => (
                                <td key={acc}>
                                    {typeof acc === "function" ? acc(row) : row[acc]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length}>
                            No se encontraron registros.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}