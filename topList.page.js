const requestUrl = 'https://raider.io/api/v1/mythic-plus/runs?season=season-sl-1&region=eu&dungeon=all&page=0';
const formSelect = document.getElementById('form-select');
const openRunElement = document.getElementById('open-run');



const sendRequest = (method, url) => {
    return fetch(url).then( response => {
        return response.json()
    })
}

const getLeaderboard = (leader) => {
    const result = (item,index) => {
        const timeMs = item.run.clear_time_ms / 60000;

        return `<div class="card card-runs border-dark mb-3">
                        <img src="img/${item.run.dungeon.name}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">№${item.rank} - ${item.run.dungeon.name}</h5>
                        <p class="card-text">Афиксы: ${item.run.weekly_modifiers[0].name}, ${item.run.weekly_modifiers[1].name}, ${item.run.weekly_modifiers[2].name}, ${item.run.weekly_modifiers[3].name}</p>
                    </div>                    
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${item.run.mythic_level}</li>
                            <li class="list-group-item">${item.run.roster[0].character.faction}</li>
                            <li class="list-group-item">${timeMs.toFixed(2)}</li>
                        </ul>
                    <div class="card-body">
                        <a onclick="getRun(${index})" href="#open-run" class="btn btn-secondary">Кто проходил</a>                        
                    </div>
                    
                </div>`
}
    return leader.map(result)
}

const getRolle = (item) => {
            let iconItemStyle = '';
            const rolle = item.character.class.slug;
            const specs = item.character.spec.slug;
                    if (rolle === 'paladin') {
                        if(specs === 'holy') {
                            iconItemStyle ='icon-item-paladin-holy';
                        } else if(specs === 'protection') {
                            iconItemStyle ='icon-item-paladin-protection';
                        } else if(specs === 'retribution') {
                            iconItemStyle ='icon-item-paladin-retribution';
                        }
                    } else if(rolle === 'priest') {
                        if(specs === 'holy') {
                            iconItemStyle ='icon-item-priest-holy';
                        } else if(specs === 'discipline') {
                            iconItemStyle ='icon-item-priest-discipline';
                        } else if(specs === 'shadowpriest') {
                            iconItemStyle ='icon-item-priest-shadowpriest';
                        }
                    } else if(rolle === 'warrior') {
                        if(specs === 'protection') {
                            iconItemStyle ='icon-item-warrior-protection';
                        } else if(specs === 'arms') {
                            iconItemStyle ='icon-item-warrior-arms';
                        } else if(specs === 'fury') {
                            iconItemStyle ='icon-item-warrior-fury';
                        }
                    } else if(rolle === 'dk') {
                        if(specs === 'blood') {
                            iconItemStyle ='icon-item-dk-blood';
                        } else if(specs === 'frost') {
                            iconItemStyle ='icon-item-dk-frost';
                        } else if(specs === 'unholy') {
                            iconItemStyle ='icon-item-dk-unholy';
                        }
                    } else if(rolle === 'demon-hunter') {
                        if(specs === 'vengeance') {
                            iconItemStyle ='icon-item-dh-vengeance';
                        } else if(specs === 'havoc') {
                            iconItemStyle ='icon-item-dh-havoc';
                        }
                    } else if(rolle === 'hunter') {
                        if(specs === 'beastmaster') {
                            iconItemStyle ='icon-item-hunter-beastmaster';
                        } else if(specs === 'marksmanship') {
                            iconItemStyle ='icon-item-hunter-marksmanship';
                        } else if(specs === 'survival') {
                            iconItemStyle ='icon-item-hunter-survival';
                        }
                    } else if(rolle === 'mage') {
                        if(specs === 'frost') {
                            iconItemStyle ='icon-item-mage-frost';
                        } else if(specs === 'arcane') {
                            iconItemStyle ='icon-item-mage-arcane';
                        } else if(specs === 'fire') {
                            iconItemStyle ='icon-item-mage-fire';
                        }
                    } else if(rolle === 'druid') {
                        if(specs === 'balance') {
                            iconItemStyle ='icon-item-druid-balance';
                        } else if(specs === 'feral') {
                            iconItemStyle ='icon-item-druid-feral';
                        } else if(specs === 'restoration') {
                            iconItemStyle ='icon-item-druid-restoration';
                        } else if(specs === 'tank') {
                            iconItemStyle ='icon-item-druid-tank';
                        }
                    } else if(rolle === 'monk') {
                        if (specs === 'brewmaster') {
                            iconItemStyle ='icon-item-monk-brewmaster';
                        } else if (specs === 'mistweaver') {
                            iconItemStyle ='icon-item-monk-mistweaver';
                        } else if (specs === 'windwalker') {
                            iconItemStyle ='icon-item-monk-windwalker';
                        }
                    } else if(rolle === 'shaman') {
                        if (specs === 'elemental') {
                            iconItemStyle ='icon-item-shaman-elemental';
                        } else if (specs === 'enchancement') {
                            iconItemStyle ='icon-item-shaman-enchancement';
                        } else if (specs === 'restoration') {
                            iconItemStyle ='icon-item-shaman-restoration';
                        }
                    } else if(rolle === 'rogue') {
                        if (specs === 'mutilation') {
                            iconItemStyle ='icon-item-rogue-mutilation';
                        } else if (specs === 'outlaw') {
                            iconItemStyle ='icon-item-rogue-outlaw';
                        } else if (specs === 'subtlety') {
                            iconItemStyle ='icon-item-rogue-subtlety';
                        }
                    } else if(rolle === 'warlock') {
                        if (specs === 'affliction') {
                            iconItemStyle ='icon-item-warlock-affliction';
                        } else if (specs === 'demonology') {
                            iconItemStyle ='icon-item-warlock-demonology';
                        } else if (specs === 'destruction') {
                            iconItemStyle ='icon-item-warlock-destruction';
                        }
                    }
    return iconItemStyle;
}



const getCharacter = (characters) => {
    const character = (item) => {

         return `<li class="list list-group-item">
                  <div id="icon-item-specs-none" class="${getRolle(item)}"></div>
                  <img src="img/rolle/${item.role}.jpg" alt="" width="30" height="30">
                   Name: ${item.character.name.replace(/[0-9]/g, '')}, Race: ${item.character.race.name}
                   </li>  `

    }
    return characters.map(character)
}

const getRun = (index) => {
    sendRequest('GET', requestUrl)
        .then(data => {
            const getOpenRun = (runDungeon) =>  {
                return `<div class="card card-run mb-3">
                <div class="card-img-run">
                <img src="img/${runDungeon.run.dungeon.name}.jpg" class="card-img-top img-run" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${runDungeon.run.dungeon.name}</h5>
                    <ul class="list-group list-group-flush">
                        ${getCharacter(runDungeon.run.roster).join('')}
                    </ul>
                </div>
            </div>`
            }
            const runDungeon = getOpenRun(data.rankings[index]);
            openRunElement.innerHTML = runDungeon;

        });
}

sendRequest('GET', requestUrl)
    .then(data => {
        const rankings = getLeaderboard(data.rankings);
        formSelect.innerHTML = rankings.join('');
    });