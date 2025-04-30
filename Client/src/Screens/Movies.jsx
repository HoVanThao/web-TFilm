// import React, { useEffect, useMemo, useState } from 'react'
// import Layout from '../Layout/Layout'
// import Filters from '../Components/Filters'
// import Movie from '../Components/Movie'
// import { useDispatch, useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
// import Loader from '../Components/Notfications/Loader'
// import { RiMovie2Line } from "react-icons/ri";
// import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
// import { LanguageData, RatesData, TimesData, YearData, TypeFilmData } from '../Data/FilterData'
// import { useParams } from 'react-router-dom'

// const MoviesPage = () => {
//     const dispatch = useDispatch();
//     const { search } = useParams();
//     const [category, setCategory] = useState({ title: "Tất cả thể loại" });
//     const [year, setYear] = useState(YearData[0]);
//     const [times, setTimes] = useState(TimesData[0]);
//     const [rates, setRates] = useState(RatesData[0]);
//     const [typefilm, setTypefilm] = useState(TypeFilmData[0]);
//     const [language, setLanguage] = useState(LanguageData[0]);

//     const sameClass = "w-full rounded-xl  border-2 border-dryGray gap-6 flex-colo h-48";
//     const { isLoading, isError, isSuccess, movies, pages, page } = useSelector((state) => state.getAllMovies);
//     const { categories } = useSelector((state) => state.categoryGetAll);
//     const [pageInput, setPageInput] = useState(page || 1);

//     const queries = useMemo(() => {
//         const query = {
//             category: category?.title === 'Tất cả thể loại' ? '' : category?.title,
//             // time: times?.title === 'Sắp xếp theo thời lượng' ? '' : times?.title.replace(/[^\d]/g, ""),
//             language: language?.title === 'Tất cả quốc gia' ? '' : language?.title,
//             rate: rates?.title === 'Sắp xếp theo số sao' ? '' : rates?.title.replace(/[^\d]/g, ""),
//             year: year?.title === 'Sắp xếp theo năm' ? '' : year?.title,
//             typeFilm: (() => {
//                 if (typefilm?.title === 'Tất cả loại phim') return '';
//                 if (typefilm?.title === 'Phim lẻ') return 'single';
//                 if (typefilm?.title === 'Phim bộ') return 'series';
//                 return '';
//             })(),
//             search: search ? search : '',
//         };
//         return query;
//     }, [category, language, year, times, rates, search, typefilm]);

//     // Effect để xử lý filter changes
//     useEffect(() => {
//         if (isError) {
//             toast.error(isError);
//         }

//         const timer = setTimeout(() => {
//             dispatch(getAllMoviesAction({ ...queries, pageNumber: 1 }));
//         }, 500); // Debounce 500ms

//         return () => clearTimeout(timer);

//     }, [dispatch, isError, queries]); // Chỉ phụ thuộc vào queries

//     // Effect riêng để xử lý page changes
//     useEffect(() => {
//         setPageInput(page);
//     }, [page]);

//     const nextPage = () => {
//         dispatch(
//             getAllMoviesAction({
//                 ...queries,
//                 pageNumber: page + 1,
//             })
//         );
//     }

//     const prevPage = () => {
//         dispatch(
//             getAllMoviesAction({
//                 ...queries,
//                 pageNumber: page - 1,
//             })
//         );
//     }

//     const handlePageInput = (e) => {
//         const value = Number(e.target.value);
//         if (value >= 1 && value <= pages) {
//             setPageInput(value);
//         }
//     };

//     const handleGoToPage = () => {
//         if (pageInput !== page) {
//             dispatch(getAllMoviesAction({
//                 ...queries,
//                 pageNumber: pageInput
//             }));
//         }
//     };

//     const datas = {
//         categories: categories,
//         category: category,
//         setCategory: setCategory,
//         language: language,
//         setLanguage: setLanguage,
//         rates: rates,
//         setRates: setRates,
//         times: times,
//         setTimes: setTimes,
//         year: year,
//         setYear: setYear,
//         typefilm: typefilm,
//         setTypefilm: setTypefilm,
//     }

//     return (
//         <Layout>
//             <div className='mx-5 min-h-screen px-2 mb-6'>
//                 <Filters data={datas} />
//                 <p className='text-lg font-medium my-6'>
//                     <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span> {' '} mục được tìm thấy {search && `với từ khóa "${search}"`}
//                 </p>
//                 {
//                     isLoading ? (
//                         <div className={sameClass}>
//                             <Loader />
//                         </div>
//                     ) :
//                         movies?.length > 0 ? (
//                             <>
//                                 <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
//                                     {
//                                         movies.map((movie, index) => (
//                                             <Movie key={index} movie={movie} />
//                                         ))
//                                     }
//                                 </div>
//                                 {/* Pages */}
//                                 <div className='w-full flex-rows gap-6 md:my-20 my-10'>
//                                     <button onClick={prevPage} disabled={page === 1}
//                                         className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
//                                     >
//                                         <RiSkipBackFill className='text-xl' />
//                                     </button>


//                                     {/* Input Page */}
//                                     <div className='flex items-center py-2 px-4 gap-2 rounded-xl font-semibold border-2 border-dryGray text-white'>
//                                         <span>Trang</span>
//                                         <input
//                                             type='number'
//                                             value={pageInput}
//                                             onChange={handlePageInput}
//                                             onBlur={handleGoToPage}
//                                             onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
//                                             className='w-16 py-1 px-2 rounded bg-dry border border-border text-center'
//                                             min={1}
//                                             max={pages}
//                                         />
//                                         <span>/ {pages}</span>
//                                     </div>

//                                     <button onClick={nextPage} disabled={page === pages}
//                                         className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
//                                     >
//                                         <RiSkipForwardFill className='text-xl' />
//                                     </button>
//                                 </div>
//                             </>
//                         ) : (
//                             <div className={sameClass}>
//                                 <div className='w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMainn text-4xl flex-colo'>
//                                     <RiMovie2Line />
//                                 </div>
//                                 <p className='text-border text-sm'>
//                                     Có vẻ như chúng ta không có bộ phim nào!
//                                 </p>
//                             </div>
//                         )

//                 }
//             </div>
//         </Layout>
//     )
// }

// export default MoviesPage

// import React, { useEffect, useMemo, useState } from 'react';
// import Layout from '../Layout/Layout';
// import Filters from '../Components/Filters';
// import Movie from '../Components/Movie';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { getAllMoviesAction } from '../Redux/Actions/moviesActions';
// import Loader from '../Components/Notfications/Loader';
// import { RiMovie2Line } from "react-icons/ri";
// import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
// import { LanguageData, RatesData, TimesData, YearData, TypeFilmData } from '../Data/FilterData';
// import { useParams, useSearchParams, useLocation } from 'react-router-dom';

// const MoviesPage = () => {
//     const dispatch = useDispatch();
//     const { search } = useParams();
//     const [searchParams] = useSearchParams();
//     const location = useLocation();

//     // State cho các filter
//     const [category, setCategory] = useState({ title: "Tất cả thể loại" });
//     const [year, setYear] = useState(YearData[0]);
//     const [times, setTimes] = useState(TimesData[0]);
//     const [rates, setRates] = useState(RatesData[0]);
//     const [typefilm, setTypefilm] = useState(TypeFilmData[0]);
//     const [language, setLanguage] = useState(LanguageData[0]);
//     const [localLoading, setLocalLoading] = useState(false);

//     const sameClass = "w-full rounded-xl border-2 border-dryGray gap-6 flex-colo h-48";
//     const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllMovies);
//     const { categories } = useSelector((state) => state.categoryGetAll);
//     const [pageInput, setPageInput] = useState(page || 1);

//     // Reset filter khi không có query params
//     useEffect(() => {
//         if (location.search === '') {
//             setCategory({ title: "Tất cả thể loại" });
//             setTypefilm(TypeFilmData[0]);
//         }
//     }, [location.search]);

//     // Xử lý query params từ URL
//     useEffect(() => {
//         const typeFilmParam = searchParams.get('typeFilm');
//         const categoryParam = searchParams.get('category');

//         if (typeFilmParam === 'series') {
//             setTypefilm(TypeFilmData.find(item => item.title === 'Phim bộ') || TypeFilmData[0]);
//         } else if (typeFilmParam === 'single') {
//             setTypefilm(TypeFilmData.find(item => item.title === 'Phim lẻ') || TypeFilmData[0]);
//         }

//         if (categoryParam === 'Chiếu rạp') {
//             setCategory({ title: 'Chiếu rạp' });
//         } else if (categoryParam === 'Anime') {
//             setCategory({ title: 'Anime' });
//         }
//     }, [searchParams]);

//     // Tạo query object cho API - ĐÃ SỬA ĐỂ CHO PHÉP KẾT HỢP FILTER
//     const queries = useMemo(() => {
//         const query = {
//             category: category?.title === 'Tất cả thể loại' ? '' : category?.title,
//             language: language?.title === 'Tất cả quốc gia' ? '' : language?.title,
//             rate: rates?.title === 'Sắp xếp theo số sao' ? '' : rates?.title.replace(/[^\d]/g, ""),
//             year: year?.title === 'Sắp xếp theo năm' ? '' : year?.title,
//             typeFilm: (() => {
//                 if (typefilm?.title === 'Tất cả loại phim') return '';
//                 if (typefilm?.title === 'Phim lẻ') return 'single';
//                 if (typefilm?.title === 'Phim bộ') return 'series';
//                 return '';
//             })(),
//             search: search ? search : '',
//         };
//         return query;
//     }, [category, language, year, times, rates, search, typefilm]);

//     // Gọi API khi queries thay đổi
//     useEffect(() => {
//         if (isError) {
//             toast.error(isError);
//         }

//         setLocalLoading(true);
//         const timer = setTimeout(() => {
//             dispatch(getAllMoviesAction({ ...queries, pageNumber: 1 }))
//                 .finally(() => setLocalLoading(false));
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [dispatch, isError, queries]);

//     // Cập nhật page input khi page thay đổi
//     useEffect(() => {
//         setPageInput(page);
//     }, [page]);

//     // Hàm xử lý phân trang
//     const nextPage = () => {
//         dispatch(
//             getAllMoviesAction({
//                 ...queries,
//                 pageNumber: page + 1,
//             })
//         );
//     };

//     const prevPage = () => {
//         dispatch(
//             getAllMoviesAction({
//                 ...queries,
//                 pageNumber: page - 1,
//             })
//         );
//     };

//     const handlePageInput = (e) => {
//         const value = Number(e.target.value);
//         if (value >= 1 && value <= pages) {
//             setPageInput(value);
//         }
//     };

//     const handleGoToPage = () => {
//         if (pageInput !== page) {
//             dispatch(getAllMoviesAction({
//                 ...queries,
//                 pageNumber: pageInput
//             }));
//         }
//     };

//     // Dữ liệu truyền vào component Filters
//     const datas = {
//         categories: categories,
//         category: category,
//         setCategory: setCategory,
//         language: language,
//         setLanguage: setLanguage,
//         rates: rates,
//         setRates: setRates,
//         times: times,
//         setTimes: setTimes,
//         year: year,
//         setYear: setYear,
//         typefilm: typefilm,
//         setTypefilm: setTypefilm,
//     };

//     return (
//         <Layout>
//             <div className='mx-5 min-h-screen px-2 mb-6'>
//                 <Filters data={datas} />
//                 <p className='text-lg font-medium my-6'>
//                     <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span> {' '}
//                     mục được tìm thấy
//                     {search && ` với từ khóa "${search}"`}
//                     {category?.title !== 'Tất cả thể loại' && ` trong thể loại "${category?.title}"`}
//                     {typefilm?.title !== 'Tất cả loại phim' && category?.title === 'Tất cả thể loại' && ` (${typefilm?.title})`}
//                 </p>

//                 {
//                     localLoading || isLoading ? (
//                         <div className={sameClass}>
//                             <Loader />
//                         </div>
//                     ) : movies?.length > 0 ? (
//                         <>
//                             <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
//                                 {movies.map((movie, index) => (
//                                     <Movie key={index} movie={movie} />
//                                 ))}
//                             </div>

//                             {/* Pagination */}
//                             <div className='w-full flex-rows gap-6 md:my-20 my-10'>
//                                 <button
//                                     onClick={prevPage}
//                                     disabled={page === 1}
//                                     className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
//                                 >
//                                     <RiSkipBackFill className='text-xl' />
//                                 </button>

//                                 <div className='flex items-center py-2 px-4 gap-2 rounded-xl font-semibold border-2 border-dryGray text-white'>
//                                     <span>Trang</span>
//                                     <input
//                                         type='number'
//                                         value={pageInput}
//                                         onChange={handlePageInput}
//                                         onBlur={handleGoToPage}
//                                         onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
//                                         className='w-16 py-1 px-2 rounded bg-dry border border-border text-center'
//                                         min={1}
//                                         max={pages}
//                                     />
//                                     <span>/ {pages}</span>
//                                 </div>

//                                 <button
//                                     onClick={nextPage}
//                                     disabled={page === pages}
//                                     className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
//                                 >
//                                     <RiSkipForwardFill className='text-xl' />
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className={sameClass}>
//                             <div className='w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMainn text-4xl flex-colo'>
//                                 <RiMovie2Line />
//                             </div>
//                             <p className='text-border text-sm'>
//                                 {search
//                                     ? `Không tìm thấy phim với từ khóa "${search}"`
//                                     : category?.title !== 'Tất cả thể loại'
//                                         ? `Không có phim nào trong thể loại "${category?.title}"`
//                                         : typefilm?.title !== 'Tất cả loại phim'
//                                             ? `Không có phim nào thuộc loại "${typefilm?.title}"`
//                                             : 'Có vẻ như chúng ta không có bộ phim nào!'
//                                 }
//                             </p>
//                         </div>
//                     )
//                 }
//             </div>
//         </Layout>
//     );
// };

// export default MoviesPage;

import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllMoviesAction } from '../Redux/Actions/moviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from "react-icons/ri";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { LanguageData, RatesData, TimesData, YearData, TypeFilmData } from '../Data/FilterData';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';

const MoviesPage = () => {
    const dispatch = useDispatch();
    const { search } = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // State cho các filter
    const [category, setCategory] = useState({ title: "Tất cả thể loại" });
    const [year, setYear] = useState(YearData[0]);
    const [times, setTimes] = useState(TimesData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const [typefilm, setTypefilm] = useState(TypeFilmData[0]);
    const [language, setLanguage] = useState(LanguageData[0]);
    const [localLoading, setLocalLoading] = useState(false);

    const sameClass = "w-full rounded-xl border-2 border-dryGray gap-6 flex-colo h-48";
    const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllMovies);
    const { categories } = useSelector((state) => state.categoryGetAll);
    const [pageInput, setPageInput] = useState(page || 1);

    // Reset filter khi không có query params
    useEffect(() => {
        if (location.search === '') {
            setCategory({ title: "Tất cả thể loại" });
            setYear(YearData[0]);
            setRates(RatesData[0]);
            setTypefilm(TypeFilmData[0]);
        }
    }, [location.search]);

    // Xử lý query params từ URL
    useEffect(() => {
        const typeFilmParam = searchParams.get('typeFilm');
        const categoryParam = searchParams.get('category');
        const yearParam = searchParams.get('year');
        const rateParam = searchParams.get('rate');
        const timeParam = searchParams.get('time');

        // Xử lý typeFilm
        if (typeFilmParam === 'series') {
            setTypefilm(TypeFilmData.find(item => item.title === 'Phim bộ') || TypeFilmData[0]);
        } else if (typeFilmParam === 'single') {
            setTypefilm(TypeFilmData.find(item => item.title === 'Phim lẻ') || TypeFilmData[0]);
        }

        // Xử lý category
        if (categoryParam) {
            const foundCategory = categories?.find(cat => cat.title === categoryParam);
            if (foundCategory) {
                setCategory(foundCategory);
            } else {
                setCategory({ title: categoryParam });
            }
        }

        // Xử lý year
        if (yearParam) {
            const foundYear = YearData.find(item => item.title.includes(yearParam));
            if (foundYear) {
                setYear(foundYear);
            }
        }

        // Xử lý rate
        if (rateParam) {
            const foundRate = RatesData.find(item => item.title.includes(rateParam));
            if (foundRate) {
                setRates(foundRate);
            }
        }

        // Xử lý time (nếu cần)
        if (timeParam) {
            const foundTime = TimesData.find(item => item.title.includes(timeParam));
            if (foundTime) {
                setTimes(foundTime);
            }
        }
    }, [searchParams, categories]);

    // Tạo query object cho API
    const queries = useMemo(() => {
        const query = {
            category: category?.title === 'Tất cả thể loại' ? '' : category?.title,
            language: language?.title === 'Tất cả quốc gia' ? '' : language?.title,
            rate: rates?.title === 'Sắp xếp theo số sao' ? '' : rates?.title.replace(/[^\d]/g, ""),
            year: year?.title === 'Sắp xếp theo năm' ? '' : year?.title,
            typeFilm: (() => {
                if (typefilm?.title === 'Tất cả loại phim') return '';
                if (typefilm?.title === 'Phim lẻ') return 'single';
                if (typefilm?.title === 'Phim bộ') return 'series';
                return '';
            })(),
            search: search ? search : '',
        };
        return query;
    }, [category, language, year, times, rates, search, typefilm]);

    // Gọi API khi queries thay đổi
    useEffect(() => {
        if (isError) {
            toast.error(isError);
        }

        setLocalLoading(true);
        const timer = setTimeout(() => {
            dispatch(getAllMoviesAction({ ...queries, pageNumber: 1 }))
                .finally(() => setLocalLoading(false));
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch, isError, queries]);

    // Cập nhật page input khi page thay đổi
    useEffect(() => {
        setPageInput(page);
    }, [page]);

    // Hàm xử lý phân trang
    const nextPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page + 1,
            })
        );
    };

    const prevPage = () => {
        dispatch(
            getAllMoviesAction({
                ...queries,
                pageNumber: page - 1,
            })
        );
    };

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

    // Dữ liệu truyền vào component Filters
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
        typefilm: typefilm,
        setTypefilm: setTypefilm,
    };

    return (
        <Layout>
            <div className='mx-5 min-h-screen px-2 mb-6'>
                <Filters data={datas} />
                <p className='text-lg font-medium my-6'>
                    <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span> {' '}
                    mục được tìm thấy
                    {search && ` với từ khóa "${search}"`}
                    {category?.title !== 'Tất cả thể loại' && ` trong thể loại "${category?.title}"`}
                    {year?.title !== 'Sắp xếp theo năm' && ` năm ${year?.title}`}
                    {rates?.title !== 'Sắp xếp theo số sao' && ` với đánh giá ${rates?.title}`}
                    {times?.title !== 'Sắp xếp theo thời lượng' && ` thời lượng ${times?.title}`}
                    {typefilm?.title !== 'Tất cả loại phim' && category?.title === 'Tất cả thể loại' && ` (${typefilm?.title})`}
                </p>

                {
                    localLoading || isLoading ? (
                        <div className={sameClass}>
                            <Loader />
                        </div>
                    ) : movies?.length > 0 ? (
                        <>
                            <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
                                {movies.map((movie, index) => (
                                    <Movie key={index} movie={movie} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className='w-full flex-rows gap-6 md:my-20 my-10'>
                                <button
                                    onClick={prevPage}
                                    disabled={page === 1}
                                    className='text-white py-2 px-4 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
                                >
                                    <RiSkipBackFill className='text-xl' />
                                </button>

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

                                <button
                                    onClick={nextPage}
                                    disabled={page === pages}
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
                                {search
                                    ? `Không tìm thấy phim với từ khóa "${search}"`
                                    : category?.title !== 'Tất cả thể loại'
                                        ? `Không có phim nào trong thể loại "${category?.title}"`
                                        : year?.title !== 'Sắp xếp theo năm'
                                            ? `Không có phim nào năm ${year?.title}`
                                            : rates?.title !== 'Sắp xếp theo số sao'
                                                ? `Không có phim nào với đánh giá ${rates?.title}`
                                                : times?.title !== 'Sắp xếp theo thời lượng'
                                                    ? `Không có phim nào với thời lượng ${times?.title}`
                                                    : typefilm?.title !== 'Tất cả loại phim'
                                                        ? `Không có phim nào thuộc loại "${typefilm?.title}"`
                                                        : 'Có vẻ như chúng ta không có bộ phim nào!'
                                }
                            </p>
                        </div>
                    )
                }
            </div>
        </Layout>
    );
};

export default MoviesPage;