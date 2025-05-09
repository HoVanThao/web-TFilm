import React from 'react'

export const Message = ({ label, placeholder, name, register }) => {
    return (
        <div className="text-sm w-full">
            <label className='text-border  font-semibold'>{label}</label>
            <textarea
                className="w-full h-40 mt-2 bg-main p-6 border  border-border rounded"
                placeholder={placeholder}
                {...register}
                name={name}
            >

            </textarea>
        </div>
    )
}

export const Select = ({ label, options, register, name }) => {
    return (
        <>
            <label className="text-border font-semibold">{label}</label>
            <select
                className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded overflow-y-scroll scrollbar-custom"
                {...register}
                name={name}
            >
                {
                    options.map((o, i) => (
                        <option key={i} value={o.value}>
                            {o.title}
                        </option>
                    ))
                }

            </select>
        </>
    )
}

export const CheckboxGroup = ({ label, options, register, name }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {options?.map((category) => (
                    <label key={category._id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={category.title}
                            {...register(name)}
                            className="form-checkbox h-5 w-5 text-subMainn rounded focus:ring-subMainn border-border"
                        />
                        <span>{category.title}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export const SelectPartFilm = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label className="text-border font-semibold">{label}</label>
            <select
                className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded overflow-y-scroll scrollbar-custom"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
            >
                {options.map((o, i) => (
                    <option key={i} value={o.value}>
                        {o.title}
                    </option>
                ))}
            </select>
        </div>
    );
};


export const Input = ({ label, placeholder, type, bg, register, name, value, onChange }) => {
    return (
        <>
            <div className='text-sm w-full'>
                <label className="text-border font-semibold">{label}</label>
                <input
                    required
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...register}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full text-sm my-2 p-5 border border-border rounded text-white ${bg ? "bg-main" : "bg-dry"
                        }`}
                />
            </div>

        </>
    )
}