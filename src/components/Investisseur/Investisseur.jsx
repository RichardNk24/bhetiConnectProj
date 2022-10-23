import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//import NavBar from '../NavBar';
import { useTheme } from '../../context/themeContext';
import { GrAppsRounded } from "react-icons/gr";
import ReactPaginate from 'react-paginate';
import SearchFilter from './SearchFilter';
import Cards from './Cards';
import axios from 'axios';
import CardModal from './CardModal';
import LoaderReact from './LoaderReact';

const Investisseur = () => {
  // useState of pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    // query useState for search
    const [query, setQuery] = useState("")
    // select card useState
    const [select, setSelect] = useState(null)
    // cards data
    const [data, setData] = useState([])
    // Modal
    const [modal, setModal] = useState(false)
    // Loading : React content loader
    const [loading, setLoading] = useState(true)
    // Theme
    const theme = useTheme()
    // Trie : Recent and Ancien
    const [trie, setTrie] = useState("")
    // Position change pagination : Tous, Startup, pme
    const [paginationSelect, setPaginationSelect] = useState("tous")



    // handle for receive data and set in useState
    const handleSetData = (response) => {
      setCurrentPage(response.meta.current_page);
      setTotalPage(response.meta.last_page);
      setItemsPerPage(response.meta.limit);
      setData(response.data);
    }


    // GET data from API
    const getData = () => {
      let source = "https://bheti-connect.smirltech.com/api/projets";
      axios.get(source).then(res => {
        handleSetData(res.data)
      }).catch((error) => console.log(error))
    }


    // Change Section of data : Tous, PME ou STARTUP
    const changeSectionMenu = (position) => {
      let source = "https://bheti-connect.smirltech.com/api/projets/search";

      if (position == "pme")
      {
        let pmeFilter = {filters: [{field: 'type', value: 'pme'}]}

        axios.post(source, pmeFilter).then(res => {
          handleSetData(res.data)
        }).catch((error) => console.log(error))

        setPaginationSelect("pme")

      }else if(position == "startup")
      {
        let startupFilter = {filters: [{field: 'type', value: 'startup'}]}

        axios.post(source, startupFilter).then(res => {
          handleSetData(res.data)
        }).catch((error) => console.log(error))
        setPaginationSelect("startup")
      }else{
        getData()
        setPaginationSelect("tous")
      }
    }


    // handle menu : tous, startup and PME for CSS
    const handleMenu = (e) => {
        let activeBtn = document.querySelector(".menuSection .active");
        let valid = e.target.tagName.toLowerCase()

        if(!e.target.classList.contains("active") && valid == "li")
        {
          activeBtn.classList.remove("active")
          e.target.classList.add("active")
        }

    }


    // Search data from API
    const searchData = (val) => {
      // API : Search
      let source = "https://bheti-connect.smirltech.com/api/projets/search"
      // Body POST
      let toSend = {
        "search": {
          "value": `${val}`
      }
      }
      // Get research
      axios.post(source, toSend).then((resp) =>{
        handleSetData(resp.data)
      }).catch((error) => {
        console.log(error);
      })
      setPaginationSelect("query")
    }

    //



    // handle change page
    let changePage = ({selected}) => {
      var pageNumber = selected + 1
      let source = ""
      let filter = ""
      let request = ""

      if(paginationSelect == "pme")
      {

        source = `https://bheti-connect.smirltech.com/api/projets/search?page=${pageNumber}`
        filter = {filters: [{field: 'type', value: 'pme'}]}

      }else if (paginationSelect == "query"){
        source = `https://bheti-connect.smirltech.com/api/projets/search?page=${pageNumber}`
        request = {
          "search": {
            "value": `${query}`
        }
        }
      }
      else if(paginationSelect == "startup")
      {

        source = `https://bheti-connect.smirltech.com/api/projets/search?page=${pageNumber}`
        filter = {filters: [{field: 'type', value: 'startup'}]}

      }else{

        source = `https://bheti-connect.smirltech.com/api/projets?page=${pageNumber}`

      }

      // get Add for another page
      if (filter)
      {
        axios.post(source, filter).then(res => {
          handleSetData(res.data)
        }).catch(error => console.log(error))
      }else if (request)
      {
        axios.post(source, request).then((resp) =>{
          handleSetData(resp.data)
        }).catch((error) => {
          console.log(error);
        })
      }
      else{
        axios.get(source).then(res => {
          handleSetData(res.data)
        }).catch(error => console.log(error))
      }
    }




     // display items
     let displayItems = data.map((item, index) => {
      return <Cards key={index} item={item} setModal={setModal} setSelect={setSelect} />
    })




    // First UseEffect
    useEffect(() => {
      const waiting = setTimeout(() => {
        setLoading(false)
      }, 4000);

      getData()
      changeSectionMenu()

      return () => {
        clearTimeout(waiting)
      }
    }, [])


     // UseEffect if currentPage change
    useEffect(() => {
      setLoading(true)
      const waiting = setTimeout(() => {
        setLoading(false)
      }, 4000);

      return () => {
        clearTimeout(waiting)
      }
    }, [currentPage])

    // useEffect of query
    useEffect(() => {
      searchData(query)
    }, [query])

    // useEffect of trie
    useEffect(() => {
      console.log(trie);
    }, [trie])


    return (
        <InvestisseurStyled>
            <HeaderText theme={theme}>
            <h3 className='hello'>Découvrez des opportunités d'investissements exclusives</h3>
            <p>Vous trouverez ci-dessous des informations clés sur des startups et PME qui ouvrent leur capital pour prendre une position décisive sur leurs
            marchés.<br/>Vous souhaitez en savoir plus sur ces opportunités et/ou rencontrer les fondateurs ? Cliquez sur "Recevoir le deck".</p>
            <div className="containerMenu">
                <div className='Box'>

                    {/* Section menu */}
                    <ul className='menuSection' onClick={handleMenu}>
                        {/* Tous */}
                        <li className='active' onClick={() => changeSectionMenu("tous")}><GrAppsRounded/>Tous</li>
                        {/* Startup */}
                        <li onClick={() => changeSectionMenu("startup")}><GrAppsRounded/>Startup</li>
                        {/* PME */}
                        <li onClick={() => changeSectionMenu("pme")}><GrAppsRounded/>PME</li>
                    </ul>

                    {/* Filter and search */}
                    <SearchFilter setQuery={setQuery} setTrie={setTrie} />
                    
                </div>
                <hr/>
            </div>
            </HeaderText>


            <AllProject theme={theme}>

              <AllCards>

              {
                  loading ? (<LoaderReact count={15}/>) : (displayItems)
              }

              </AllCards>

              {/* Pagination */}

              <ReactPaginate
              previousLabel={"« Précédent"}
              nextLabel={"Suivant »"}
              pageCount={totalPage}
              onPageChange={changePage}
              breakLabel="..."
              pageRangeDisplayed={7}
              marginPagesDisplayed={1}
              containerClassName={"containerClassName"}
              pageClassName={"pageClassName"}
              previousLinkClassName={"previousLinkClassName"}
              nextLinkClassName={"nextLinkClassName"}
              disabledClassName={"disabledClassName"}
              activeClassName={"activeClassName"}
              />
            

            </AllProject>

            {
              modal && <CardModal select={select} setModal={setModal}/>
            }


        </InvestisseurStyled>
    )
}

// Style CSS with styled component

const InvestisseurStyled = styled.section`


`;

const AllCards = styled.div`
display: flex;
width: 100%;
justify-content: space-evenly;
flex-wrap: wrap;
`;

const AllProject = styled.div`

.containerClassName {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
  align-items:center;
  user-select: none;
  font-size: 13px;
}

.containerClassName li {
  margin: 50px 10px;
}

.pageClassName{
  background-color: ${props => props.theme.colorGrey5};
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  transition: .3s ease;


  &:hover{
    background-color: ${props => props.theme.colorBheti};
  }

  a{
    color:white;
  }
}

.previousLinkClassName{
  background-color: ${props => props.theme.colorGrey5};
  padding: 5px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.theme.colorBheti};
  }
}

.nextLinkClassName{
  background-color: ${props => props.theme.colorGrey5};
  padding: 5px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.theme.colorBheti};
  }
}


.activeClassName{
  background-color: ${props => props.theme.colorBheti};
  color: white;
  border-radius: 50px;
}

.disabledClassName{

}


`;

const HeaderText = styled.div`
margin: 55px;

h3 {
  
  font-size: 25px;
  color: ${props => props.theme.colorPrimary};
  
}

p {
  margin: 10px 0;
  font-size: 14px;
}

.menuSection{
    display: flex;
    flex-direction:row;
    list-style: none;
    margin-bottom: -4px;

    svg{
        padding-top:4px;
        padding-right:3px;
    }
}

.menuSection li {
  margin-right: 20px;
  padding-bottom: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover{
    color: ${props => props.theme.colorBheti};
  }

}

.containerMenu{
    margin-top: 30px;


    hr {
    margin-top: -9px;
    }
}

.containerMenu .Box{
    display: flex;
    justify-content: space-between;
    align-items:center;
}

.active {
    border-bottom: 2px solid ${props => props.theme.colorBheti};
}

`;


export default Investisseur