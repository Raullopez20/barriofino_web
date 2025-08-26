document.addEventListener("DOMContentLoaded",async()=>{document.getElementById("upcoming-events-container");const s=document.getElementById("events-loading"),r=document.getElementById("no-events"),a=document.getElementById("events-grid");try{const o=await fetch("/barriofino_web/data/events.json");if(!o.ok)throw new Error("No se pudieron cargar los eventos");const c=await o.json(),m=new Date,i=c.filter(e=>new Date(e.date+"T"+(e.time||"00:00"))>=m);i.sort((e,t)=>{const d=new Date(e.date+"T"+(e.time||"00:00")),n=new Date(t.date+"T"+(t.time||"00:00"));return d-n});const l=i.slice(0,3);s.style.display="none",l.length===0?r.classList.remove("hidden"):(a.classList.remove("hidden"),a.innerHTML=l.map((e,t)=>{const n=new Date(e.date).toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"});return`
                    <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="${(t+1)*200}">
                        <!-- Imagen del evento -->
                        <div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            ${e.image?`
                                <img src="/barriofino_web/${e.image.replace(/^\//,"")}" 
                                     alt="${e.title}" 
                                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            `:`
                                <div class="w-full h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <p class="text-gray-500 font-medium">${e.title}</p>
                                    </div>
                                </div>
                            `}
                            
                            <!-- Badge de próximo evento -->
                            <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                Próximo
                            </div>
                        </div>
                        
                        <!-- Contenido del evento -->
                        <div class="p-6">
                            <!-- Fecha y hora -->
                            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <span class="capitalize font-medium">${n}</span>
                                </div>
                                ${e.time?`
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span class="font-medium">${e.time}</span>
                                    </div>
                                `:""}
                            </div>
                            
                            <!-- Título -->
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
                                ${e.title}
                            </h3>
                            
                            <!-- Descripción -->
                            <p class="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                ${e.description}
                            </p>
                            
                            <!-- Ubicación -->
                            ${e.location?`
                                <div class="flex items-center text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
                                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span class="font-medium">${e.location}</span>
                                </div>
                            `:""}
                            
                            <!-- Botón de más información -->
                            <div class="pt-4 border-t border-gray-100">
                                <a href="/barriofino_web/eventos#event-${e.id}" 
                                   class="w-full flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg hover:shadow-xl group">
                                    <span>Más Información</span>
                                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                `}).join(""))}catch(o){console.error("Error cargando eventos:",o),s.style.display="none",r.classList.remove("hidden"),r.innerHTML=`
            <div class="text-center py-16">
                <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Error al cargar eventos</h3>
                <p class="text-gray-600 mb-8">No se pudieron cargar los próximos eventos. Por favor, intenta más tarde.</p>
                <a href="/barriofino_web/eventos" class="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                    Ver página de eventos
                </a>
            </div>
        `}});
