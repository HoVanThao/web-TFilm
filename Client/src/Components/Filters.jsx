import React from 'react'
import { YearData, TimesData, RatesData, LanguageData, TypeFilmData } from '../Data/FilterData.js'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { FaAngleDown, FaCheck } from 'react-icons/fa';

const Filters = (props) => {

    const {
        categories,
        category,
        setCategory,
        language,
        setLanguage,
        year,
        setYear,
        times,
        setTimes,
        rates,
        setRates,
        typefilm,
        setTypefilm,
    } = props?.data;

    const Filter = [
        {
            value: category,
            onChange: setCategory,
            items: categories?.length ? [{ title: "Tất cả thể loại" }, ...categories] : [{ title: "Loading..." }],
        },
        {
            value: language,
            onChange: setLanguage,
            items: LanguageData,
        },
        {
            value: rates,
            onChange: setRates,
            items: RatesData,
        },
        {
            value: year,
            onChange: setYear,
            items: YearData,
        }
        ,
        {
            value: typefilm,
            onChange: setTypefilm,
            items: TypeFilmData,
        },
    ]

    return (

        <div className='my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6'>
            {Filter.map((item, index) => (
                <Listbox key={index} value={item.value} onChange={item.onChange}>
                    <div className='relative'>
                        <ListboxButton className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                            <span className='block truncate'>{item.value.title}</span>
                            <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                                <FaAngleDown className='h-4 w-4' aria-hidden="true" />
                            </span>
                        </ListboxButton>
                        <ListboxOptions className='absolute z-10 mt-1 w-full bg-main border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                            {item.items.map((option, i) => (
                                <ListboxOption
                                    key={i}
                                    value={option}
                                    className={({ actives }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${actives ? "bg-dry text-subMainn" : "text-dryGray"}`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {option.title}
                                            </span>
                                            {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                                    <FaCheck className='h-3 w-3' aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            ))}
        </div>

    )
}

export default Filters

