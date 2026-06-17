/**
 * Cinematic Birthday Web Engine 
 * Designed using Vanilla ECMAScript for Ultra-Smooth Interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Temporal Anchors
    const TARGET_DOB = new Date("2007-06-18T00:00:00");
    
    // Canvas Memory Fields
    let canvasElement, canvasContext;
    let floatingParticlesPool = [];
    let explosiveParticlesPool = [];
    let fieldWidth = window.innerWidth;
    let fieldHeight = window.innerHeight;
    
    // System Configurations
    const GEOMETRIC_PARTICLE_VARIETIES = { HEART: 'heart', SPARKLE: 'sparkle', FIREFLY: 'firefly', PETAL: 'petal', BUTTERFLY: 'butterfly' };
    let engineCelebrationState = false;
    let webAudioContextNode = null;
    let ambientOscillatorTrack = null;

    // ==========================================
    // 1. BACKPLANE ENGINE INITIALIZATION
    // ==========================================
    function initializeParticleEngineBackplane() {
        canvasElement = document.getElementById("globalParticleEngine");
        canvasContext = canvasElement.getContext("2d");
        synchronizeCanvasBoundaries();
        
        window.addEventListener("resize", synchronizeCanvasBoundaries);
        
        // Spawn standard ambient particle base layout density
        for(let poolCount=0; poolCount < 50; poolCount++) {
            floatingParticlesPool.push(generateVectorParticle(false));
        }
    }

    function synchronizeCanvasBoundaries() {
        fieldWidth = window.innerWidth;
        fieldHeight = window.innerHeight;
        canvasElement.width = fieldWidth;
        canvasElement.height = fieldHeight;
    }

    // ==========================================
    // 2. STRUCTURAL VECTOR MATHEMATICS (PARTICLES)
    // ==========================================
    function generateVectorParticle(enforceTopSpawn = false) {
        const structuralCategories = Object.values(GEOMETRIC_PARTICLE_VARIETIES);
        const randomizedCategory = structuralCategories[Math.floor(Math.random() * structuralCategories.length)];
        
        return {
            xPosition: Math.random() * fieldWidth,
            yPosition: enforceTopSpawn ? -25 : Math.random() * fieldHeight,
            radiusMagnitude: Math.random() * 6 + 4,
            deltaX: Math.random() * 1.6 - 0.8,
            deltaY: Math.random() * 1.3 + 0.5,
            category: randomizedCategory,
            colorHex: identifyCategoryColor(randomizedCategory),
            opacityValue: Math.random() * 0.65 + 0.3,
            waveFrequency: Math.random() * 0.03 + 0.01,
            wavePhaseAngle: Math.random() * Math.PI,
            rotationalVector: Math.random() * Math.PI
        };
    }

    function identifyCategoryColor(category) {
        const premiumRosePalette = ['#FF4D88', '#FF85C1', '#FFD6EA', '#FF1493'];
        const aurumPalette = ['#FFD700', '#FFF9E6', '#FFA751'];
        if (category === GEOMETRIC_PARTICLE_VARIETIES.SPARKLE || category === GEOMETRIC_PARTICLE_VARIETIES.FIREFLY) {
            return aurumPalette[Math.floor(Math.random() * aurumPalette.length)];
        }
        return premiumRosePalette[Math.floor(Math.random() * premiumRosePalette.length)];
    }

    function triggerExplosiveEmitterVector(sourceX, sourceY, particleCountDensity = 70) {
        for(let loopIdx=0; loopIdx < particleCountDensity; loopIdx++) {
            const vectorAngle = Math.random() * Math.PI * 2;
            const absoluteVelocity = Math.random() * 7 + 2;
            explosiveParticlesPool.push({
                xCurrent: sourceX,
                yCurrent: sourceY,
                velocityX: Math.cos(vectorAngle) * absoluteVelocity,
                velocityY: Math.sin(vectorAngle) * absoluteVelocity - (Math.random() * 2),
                radiusSize: Math.random() * 5 + 3,
                colorSignature: ['#FF4D88', '#FF85C1', '#FFD700', '#FFFFFF', '#00E5FF'][Math.floor(Math.random() * 5)],
                alphaLevel: 1,
                decayFactor: Math.random() * 0.016 + 0.012
            });
        }
    }

    // High Performance Vector Graphics Computation Frame Loop
    function pipelineRenderLoop() {
        canvasContext.clearRect(0, 0, fieldWidth, fieldHeight);
        
        // Render Floating Background Vectors
        for (let idx = 0; idx < floatingParticlesPool.length; idx++) {
            let activeParticle = floatingParticlesPool[idx];
            activeParticle.yPosition += activeParticle.deltaY;
            activeParticle.wavePhaseAngle += activeParticle.waveFrequency;
            activeParticle.xPosition += Math.sin(activeParticle.wavePhaseAngle) * activeParticle.deltaX;
            
            if (activeParticle.yPosition > fieldHeight + 25) {
                floatingParticlesPool[idx] = generateVectorParticle(true);
            }
            
            canvasContext.save();
            canvasContext.globalAlpha = activeParticle.opacityValue;
            canvasContext.fillStyle = activeParticle.colorHex;
            canvasContext.translate(activeParticle.xPosition, activeParticle.yPosition);
            canvasContext.rotate(activeParticle.rotationalVector);
            
            renderStructuralGeometry(activeParticle.category, activeParticle.radiusMagnitude);
            canvasContext.restore();
        }

        // Render Active Blast Fragments (Fireworks/Balloons/Confetti Matrix Elements)
        for (let targetIdx = explosiveParticlesPool.length - 1; targetIdx >= 0; targetIdx--) {
            let blastNode = explosiveParticlesPool[targetIdx];
            blastNode.xCurrent += blastNode.velocityX;
            blastNode.yCurrent += blastNode.velocityY;
            blastNode.velocityY += 0.09; // Downward gravity component constant mapping
            blastNode.alphaLevel -= blastNode.decayFactor;
            
            if (blastNode.alphaLevel <= 0) {
                explosiveParticlesPool.splice(targetIdx, 1);
                continue;
            }
            
            canvasContext.save();
            canvasContext.globalAlpha = blastNode.alphaLevel;
            canvasContext.fillStyle = blastNode.colorSignature;
            canvasContext.beginPath();
            canvasContext.arc(blastNode.xCurrent, blastNode.yCurrent, blastNode.radiusSize, 0, Math.PI * 2);
            canvasContext.fill();
            canvasContext.restore();
        }

        if (engineCelebrationState && floatingParticlesPool.length < 200) {
            floatingParticlesPool.push(generateVectorParticle(true));
        }

        requestAnimationFrame(pipelineRenderLoop);
    }

    function renderStructuralGeometry(category, radiusMagnitude) {
        if (category === GEOMETRIC_PARTICLE_VARIETIES.HEART) {
            canvasContext.beginPath();
            canvasContext.moveTo(0, 0);
            canvasContext.bezierCurveTo(-radiusMagnitude / 2, -radiusMagnitude / 2, -radiusMagnitude, radiusMagnitude / 3, 0, radiusMagnitude);
            canvasContext.bezierCurveTo(radiusMagnitude, radiusMagnitude / 3, radiusMagnitude / 2, -radiusMagnitude / 2, 0, 0);
            canvasContext.fill();
        } else if (category === GEOMETRIC_PARTICLE_VARIETIES.SPARKLE) {
            canvasContext.beginPath();
            for (let vertexCount = 0; vertexCount < 4; vertexCount++) {
                canvasContext.lineTo(0, -radiusMagnitude);
                canvasContext.lineTo(radiusMagnitude/4, -radiusMagnitude/4);
                canvasContext.rotate(Math.PI / 2);
            }
            canvasContext.fill();
        } else {
            canvasContext.beginPath();
            canvasContext.arc(0, 0, radiusMagnitude / 2, 0, Math.PI * 2);
            canvasContext.fill();
        }
    }

    // ==========================================
    // 3. PRELOADER ORCHESTRATION PIPELINE
    // ==========================================
    function processPreloaderSequence() {
        const barFillNode = document.getElementById("experienceProgressFill");
        const numericNode = document.getElementById("digitalPercentDisplay");
        const interfaceOverlay = document.getElementById("cinematicLoader");
        const mainWrapperNode = document.getElementById("luxuryCanvasWrapper");
        
        let localProgressValue = 0;
        
        const simulationClock = setInterval(() => {
            localProgressValue += Math.floor(Math.random() * 7) + 3;
            if (localProgressValue >= 100) {
                localProgressValue = 100;
                clearInterval(simulationClock);
                
                setTimeout(() => {
                    interfaceOverlay.style.opacity = "0";
                    mainWrapperNode.classList.add("experience-visible");
                    
                    setTimeout(() => {
                        interfaceOverlay.remove();
                        initializeIntersectionObservers();
                    }, 1000);
                }, 500);
            }
            barFillNode.style.width = `${localProgressValue}%`;
            numericNode.textContent = `${localProgressValue}%`;
        }, 50);
    }

    // ==========================================
    // 4. TEMPORAL CHRONO CALCULATION MATRIX
    // ==========================================
    function calculateChronologySnapshots() {
        const immediateCurrentDate = new Date();
        
        // 1. Real-Time Dynamic Age Calculation Engine
        let totalYearsCalculated = immediateCurrentDate.getFullYear() - TARGET_DOB.getFullYear();
        let totalMonthsCalculated = immediateCurrentDate.getMonth() - TARGET_DOB.getMonth();
        let totalDaysCalculated = immediateCurrentDate.getDate() - TARGET_DOB.getDate();

        if (totalDaysCalculated < 0) {
            const physicalDaysInMonth = new Date(immediateCurrentDate.getFullYear(), immediateCurrentDate.getMonth(), 0).getDate();
            totalDaysCalculated += physicalDaysInMonth;
            totalMonthsCalculated--;
        }
        if (totalMonthsCalculated < 0) {
            totalMonthsCalculated += 12;
            totalYearsCalculated--;
        }

        document.getElementById("matrixYears").textContent = totalYearsCalculated.toString().padStart(2, '0');
        document.getElementById("matrixMonths").textContent = totalMonthsCalculated.toString().padStart(2, '0');
        document.getElementById("matrixDays").textContent = totalDaysCalculated.toString().padStart(2, '0');

        // 2. Next Anniversary Countdown Engine
        let targetedAnniversaryStamp = new Date(immediateCurrentDate.getFullYear(), TARGET_DOB.getMonth(), TARGET_DOB.getDate());
        if (immediateCurrentDate > targetedAnniversaryStamp) {
            targetedAnniversaryStamp.setFullYear(immediateCurrentDate.getFullYear() + 1);
        }

        const exactTimeDelta = targetedAnniversaryStamp - immediateCurrentDate;
        
        const deltaDays = Math.floor(exactTimeDelta / (1000 * 60 * 60 * 24));
        const deltaHours = Math.floor((exactTimeDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const deltaMins = Math.floor((exactTimeDelta % (1000 * 60 * 60)) / (1000 * 60));
        const deltaSecs = Math.floor((exactTimeDelta % (1000 * 60)) / 1000);

        document.getElementById("timeDays").textContent = deltaDays.toString().padStart(2, '0');
        document.getElementById("timeHours").textContent = deltaHours.toString().padStart(2, '0');
        document.getElementById("timeMins").textContent = deltaMins.toString().padStart(2, '0');
        document.getElementById("timeSecs").textContent = deltaSecs.toString().padStart(2, '0');
    }

    // ==========================================
    // 5. NARRATIVE STREAMING CONTROLLER (TYPEWRITER)
    // ==========================================
    const primaryEpistolaryProse = `Happy 19th Birthday Hyma Sri Vyshnavi ❤️\n\nMay your life always be filled with happiness, love, success, laughter, good health, and beautiful memories.\n\nMay every dream you wish for come true.\n\nMay your future shine brighter than the stars.\n\nKeep smiling, keep growing, and keep inspiring everyone around you.\n\nWishing you endless joy and a wonderful future ahead. ✨`;
    
    let processTypewriterFired = false;
    function beginTypewriterProseStream() {
        if(processTypewriterFired) return;
        processTypewriterFired = true;
        
        const outputHarbor = document.getElementById("typewriterOutputNode");
        outputHarbor.innerHTML = `<span class="prose-content-field"></span><span class="monochrome-cursor-node"></span>`;
        const innerTextSpanContainer = outputHarbor.querySelector(".prose-content-field");
        
        let characterCursorPointer = 0;
        function characterAppenderLoop() {
            if (characterCursorPointer < primaryEpistolaryProse.length) {
                innerTextSpanContainer.textContent += primaryEpistolaryProse.charAt(characterCursorPointer);
                characterCursorPointer++;
                setTimeout(characterAppenderLoop, 35);
            }
        }
        characterAppenderLoop();
    }

    // ==========================================
    // 6. SCROLL OBSERVER AND PARALLAX TILT ENGINES
    // ==========================================
    function initializeIntersectionObservers() {
        const visualMotionTargets = document.querySelectorAll(
            '.reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in'
        );

        const globalObserverSettings = { threshold: 0.1, rootMargin: "0px 0px -30px 0px" };
        
        const scrollObserverInstance = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                    if (entry.target.classList.contains('trigger-stream-hook')) {
                        beginTypewriterProseStream();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, globalObserverSettings);

        visualMotionTargets.forEach(element => scrollObserverInstance.observe(element));
        
        const textualStreamHookNode = document.querySelector(".trigger-stream-hook");
        if(textualStreamHookNode) scrollObserverInstance.observe(textualStreamHookNode);
    }

    function setupInteractiveMouseParallaxTilt() {
        const elementsToTilt = document.querySelectorAll(".dynamic-mouse-tilt");
        
        elementsToTilt.forEach(targetCard => {
            targetCard.addEventListener("mousemove", (event) => {
                const layoutBoxBounds = targetCard.getBoundingClientRect();
                const absoluteCardWidth = layoutBoxBounds.width;
                const absoluteCardHeight = layoutBoxBounds.height;
                
                const coordinateOffsetValueX = event.clientX - layoutBoxBounds.left - (absoluteCardWidth / 2);
                const coordinateOffsetValueY = event.clientY - layoutBoxBounds.top - (absoluteCardHeight / 2);
                
                const tiltIntensityCoefficient = parseFloat(targetCard.getAttribute("data-tilt-factor")) || 12;
                const calculatedDegreeRotationX = -(coordinateOffsetValueY / (absoluteCardHeight / 2)) * tiltIntensityCoefficient;
                const calculatedDegreeRotationY = (coordinateOffsetValueX / (absoluteCardWidth / 2)) * tiltIntensityCoefficient;
                
                targetCard.style.transform = `rotateX(${calculatedDegreeRotationX}deg) rotateY(${calculatedDegreeRotationY}deg) scale3d(1.03, 1.03, 1.03)`;
            });

            targetCard.addEventListener("mouseleave", () => {
                targetCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // ==========================================
    // 7. MULTI-LAYERED 3D COMPONENT GENERATORS
    // ==========================================
    function dynamicallyAssemble3DCandles() {
        const candleAnchor = document.getElementById("candleGeometricAnchor");
        const internalCandleTargetDensity = 19; 
        const targetRingRadiusValue = 48; 

        for(let candleIdx=0; candleIdx < internalCandleTargetDensity; candleIdx++) {
            const calculationAngleRadians = (candleIdx / internalCandleTargetDensity) * Math.PI * 2;
            const horizontalCoordinateX = Math.cos(calculationAngleRadians) * targetRingRadiusValue + 53; 
            const horizontalCoordinateY = Math.sin(calculationAngleRadians) * targetRingRadiusValue + 53;

            const pillarDivNode = document.createElement("div");
            pillarDivNode.className = "matrix-candlestick-pillar";
            pillarDivNode.style.left = `${horizontalCoordinateX}px`;
            pillarDivNode.style.top = `${horizontalCoordinateY}px`;
            pillarDivNode.style.transform = `translateZ(0px) rotateZ(${(calculationAngleRadians * 180 / Math.PI) + 90}deg)`;

            const flameDivNode = document.createElement("div");
            flameDivNode.className = "matrix-flame-node active-fire-bloom";
            
            pillarDivNode.appendChild(flameDivNode);
            candleAnchor.appendChild(pillarDivNode);
        }
    }

    function build3DWishesCarouselMatrix() {
        const trackingRingNode = document.getElementById("carouselRotatorRing");
        const internalWishesTextArray = [
            "💖 Stay Happy", "🌸 Stay Blessed", "✨ Stay Successful",
            "🌈 Keep Smiling", "🎂 Enjoy Every Moment", "💫 Shine Bright",
            "🌹 Stay Beautiful", "⭐ Reach Your Dreams"
        ];
        
        const aggregateCount = internalWishesTextArray.length;
        const calculatedRadiusZDepth = Math.round((230 / 2) / Math.tan(Math.PI / aggregateCount)) + 45;

        internalWishesTextArray.forEach((textPhrase, phraseIdx) => {
            const calculationYRotationDegrees = (360 / aggregateCount) * phraseIdx;
            const panelElementPlate = document.createElement("div");
            panelElementPlate.className = "carousel-panel-plate";
            panelElementPlate.style.transform = `rotateY(${calculationYRotationDegrees}deg) translateZ(${calculatedRadiusZDepth}px)`;
            
            panelElementPlate.innerHTML = `<span class="carousel-wish-text">${textPhrase}</span>`;
            trackingRingNode.appendChild(panelElementPlate);
        });
    }

    // ==========================================
    // 8. LUXURY WEB AUDIO SYSTEM SYNTHESIS
    // ==========================================
    function constructAudioSubsystemNodes() {
        if (webAudioContextNode) return;
        try {
            const FallbackContextClass = window.AudioContext || window.webkitAudioContext;
            webAudioContextNode = new FallbackContextClass();
        } catch(audioSystemErr) {
            console.warn("Target browser architectural landscape prevents Native Web Audio implementation parameters.");
        }
    }

    let continuousSequenceTimerLoop = null;
    function controlMusicSynthesizerStream(activationFlag) {
        if (!activationFlag) {
            if (continuousSequenceTimerLoop) clearInterval(continuousSequenceTimerLoop);
            return;
        }
        
        constructAudioSubsystemNodes();
        if(!webAudioContextNode) return;

        const harmonicMelodicScaleFrequencies = [293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // D Major Pentatonic Shimmer
        let scalePointerIdx = 0;

        continuousSequenceTimerLoop = setInterval(() => {
            if (webAudioContextNode.state === 'suspended') {
                webAudioContextNode.resume();
            }
            
            let audioOscillatorNode = webAudioContextNode.createOscillator();
            let audioGainNode = webAudioContextNode.createGain();
            
            audioOscillatorNode.type = 'sine';
            audioOscillatorNode.frequency.setValueAtTime(harmonicMelodicScaleFrequencies[scalePointerIdx % harmonicMelodicScaleFrequencies.length], webAudioContextNode.currentTime);
            
            audioGainNode.gain.setValueAtTime(0.1, webAudioContextNode.currentTime);
            audioGainNode.gain.exponentialRampToValueAtTime(0.001, webAudioContextNode.currentTime + 0.9);
            
            audioOscillatorNode.connect(audioGainNode);
            audioGainNode.connect(webAudioContextNode.destination);
            
            audioOscillatorNode.start();
            audioOscillatorNode.stop(webAudioContextNode.currentTime + 0.9);
            
            scalePointerIdx++;
        }, 380);
    }

    // ==========================================
    // 9. EVENT REGISTRATION CONNECTORS
    // ==========================================
    function bindInteractiveComponentActionHooks() {
        
        const audioControllerBtn = document.getElementById("masterAudioToggle");
        audioControllerBtn.addEventListener("click", () => {
            audioControllerBtn.classList.toggle("playing-track-active");
            const structuralPlaybackState = audioControllerBtn.classList.contains("playing-track-active");
            controlMusicSynthesizerStream(structuralPlaybackState);
        });

        document.getElementById("initiateJourneyBtn").addEventListener("click", () => {
            document.getElementById("chronomatrixSection").scrollIntoView({ behavior: "smooth" });
            if(!audioControllerBtn.classList.contains("playing-track-active")) {
                audioControllerBtn.click();
            }
        });

        // Media Lightbox Viewport Controls
        const globalLightboxWrapper = document.getElementById("masterLightboxPlatform");
        const internalLightboxImgNode = document.getElementById("lightboxTargetMediaCanvas");
        
        document.querySelectorAll(".image-interactive-trigger").forEach(brickCard => {
            brickCard.addEventListener("click", () => {
                const verifiedMediaSourcePath = brickCard.getAttribute("data-media-target");
                internalLightboxImgNode.src = verifiedMediaSourcePath;
                globalLightboxWrapper.classList.add("active-modal-state");
            });
        });

        document.getElementById("closeLightboxTrigger").addEventListener("click", () => {
            globalLightboxWrapper.classList.remove("active-modal-state");
        });

        // Candle Blowing Interface Trigger Execution
        const blowActionBtn = document.getElementById("extinguishCandlesBtn");
        blowActionBtn.addEventListener("click", () => {
            const totalActiveFlameNodes = document.querySelectorAll(".matrix-flame-node");
            totalActiveFlameNodes.forEach(node => node.classList.add("is-extinguished"));
            
            triggerExplosiveEmitterVector(window.innerWidth / 2, window.innerHeight * 0.65, 100);
            engineCelebrationState = true;
            
            blowActionBtn.innerHTML = `<span>✨ 19th Wishes Set Free ✨</span>`;
            blowActionBtn.disabled = true;
        });

        // Monolithic Celebration Framework Emitter Hook
        document.getElementById("globalCelebrateTrigger").addEventListener("click", () => {
            engineCelebrationState = true;
            for(let blastWaveCount=0; blastWaveCount < 4; blastWaveCount++) {
                setTimeout(() => {
                    triggerExplosiveEmitterVector(
                        Math.random() * fieldWidth,
                        fieldHeight * 0.35,
                        85
                    );
                }, blastWaveCount * 250);
            }
        });

        // Epistolary Surprise Modal Hooks
        const giftMeshTrigger = document.getElementById("giftInteractiveMesh");
        const giftBtnTrigger = document.getElementById("openGiftTriggerBtn");
        const surpriseModalShroud = document.getElementById("royalGiftModal");
        const closeSurpriseModalBtn = document.getElementById("dismissModalBtn");

        const structuralGiftRevealWorkflow = () => {
            surpriseModalShroud.classList.add("active-modal-state");
            triggerExplosiveEmitterVector(window.innerWidth / 2, window.innerHeight / 2, 110);
        };

        if(giftMeshTrigger) giftMeshTrigger.addEventListener("click", structuralGiftRevealWorkflow);
        if(giftBtnTrigger) giftBtnTrigger.addEventListener("click", structuralGiftRevealWorkflow);
        
        closeSurpriseModalBtn.addEventListener("click", () => {
            surpriseModalShroud.classList.remove("active-modal-state");
        });

        window.addEventListener("click", (windowEvent) => {
            if (windowEvent.target === surpriseModalShroud) surpriseModalShroud.classList.remove("active-modal-state");
            if (windowEvent.target === globalLightboxWrapper) globalLightboxWrapper.classList.remove("active-modal-state");
        });
    }

    // ==========================================
    // PERFORMANCE RUNTIME INITIALIZATION START
    // ==========================================
    initializeParticleEngineBackplane();
    dynamicallyAssemble3DCandles();
    build3DWishesCarouselMatrix();
    setupInteractiveMouseParallaxTilt();
    bindInteractiveComponentActionHooks();
    
    // Launch Continuous Temporal Tracking Matrices
    setInterval(calculateChronologySnapshots, 1000);
    calculateChronologySnapshots();

    // Fire Main Application Vector Render Pipelines
    requestAnimationFrame(pipelineRenderLoop);
    processPreloaderSequence();
});