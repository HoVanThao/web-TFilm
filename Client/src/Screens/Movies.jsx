import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../Layout/Layout'
import Filters from '../Components/Filters'
import Movie from '../Components/Movie'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
import Loader from '../Components/Notfications/Loader'
import { RiMovie2Line } from "react-icons/ri";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { LanguageData, RatesData, TimesData, YearData } from '../Data/FilterData'

const MoviesPage = () => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState({ title: "Tất cả thể loại" });
    const [year, setYear] = useState(YearData[0]);
    const [times, setTimes] = useState(TimesData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const [language, setLanguage] = useState(LanguageData[0]);

    const sameClass = "w-full rounded-xl  border-2 border-dryGray gap-6 flex-colo h-48";
    const { isLoading, isError, isSuccess, movies, pages, page } = useSelector((state) => state.getAllMovies);
    const { categories } = useSelector((state) => state.categoryGetAll);
    const [pageInput, setPageInput] = useState(page || 1);

    const queries = useMemo(() => {
        const query = {
            category: category?.title === 'Tất cả thể loại' ? '' : category?.title,
            time: times?.title === 'Sắp xếp theo thời lượng' ? '' : times?.title.replace(/[^\d]/g, ""),
            language: language?.title === 'Sắp xếp theo ngôn ngữ' ? '' : language?.title,
            rate: rates?.title === 'Sắp xếp theo số sao' ? '' : rates?.title.replace(/[^\d]/g, ""),
            year: year?.title === 'Sắp xếp theo năm' ? '' : year?.title,
            search: '',
        };
        return query;
    }, [category, language, year, times, rates]);

    // Effect để xử lý filter changes
    useEffect(() => {
        if (isError) {
            toast.error(isError);
        }

        const timer = setTimeout(() => {
            dispatch(getAllMoviesAction({ ...queries, pageNumber: 1 }));
        }, 500); // Debounce 500ms

        return () => clearTimeout(timer);

    }, [dispatch, isError, queries]); // Chỉ phụ thuộc vào queries

    // Effect riêng để xử lý page changes
    useEffect(() => {
        setPageInput(page);
    }, [page]);

    const nextPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page + 1,
            })
        );
    }

    const prevPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page - 1,
            })
        );
    }

    const handlePageInput = (e) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= pages) {
            setPageInput(value);
        }
    };

    const handleGoToPage = () => {
        if (pageInput !== page) {
            dispatch(getAllMoviesAction({
                ...queries,
                pageNumber: pageInput
            }));
        }
    };

    const datas = {
        categories: categories,
        category: category,
        setCategory: setCategory,
        language: language,
        setLanguage: setLanguage,
        rates: rates,
        setRates: setRates,
        times: times,
        setTimes: setTimes,
        year: year,
        setYear: setYear,
    }

    return (
        <Layout>
            <div className='mx-5 min-h-screen px-2 mb-6'>
                <Filters data={datas} />
                <p className='text-lg font-medium my-6'>
                    Total <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span> {' '} items Found
                </p>
                {
                    isLoading ? (
                        <div className={sameClass}>
                            <Loader />
                        </div>
                    ) :
                        movies?.length > 0 ? (
                            <>
                                <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
                                    {
                                        movies.map((movie, index) => (
                                            <Movie key={index} movie={movie} />
                                        ))
                                    }
                                </div>
                                {/* Pages */}
                                <div className='w-full flex-rows gap-6 md:my-20 my-10'>
                                    <button onClick={prevPage} disabled={page === 1}
                                        className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
                                    >
                                        <RiSkipBackFill className='text-xl' />
                                    </button>


                                    {/* Input Page */}
                                    <div className='flex items-center py-2 px-4 gap-2 rounded-xl font-semibold border-2 border-dryGray text-white'>
                                        <span>Trang</span>
                                        <input
                                            type='number'
                                            value={pageInput}
                                            onChange={handlePageInput}
                                            onBlur={handleGoToPage}
                                            onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
                                            className='w-16 py-1 px-2 rounded bg-dry border border-border text-center'
                                            min={1}
                                            max={pages}
                                        />
                                        <span>/ {pages}</span>
                                    </div>

                                    <button onClick={nextPage} disabled={page === pages}
                                        className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
                                    >
                                        <RiSkipForwardFill className='text-xl' />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={sameClass}>
                                <div className='w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMainn text-4xl flex-colo'>
                                    <RiMovie2Line />
                                </div>
                                <p className='text-border text-sm'>
                                    Có vẻ như chúng ta không có bộ phim nào!
                                </p>
                            </div>
                        )

                }
            </div>
        </Layout>
    )
}

export default MoviesPage