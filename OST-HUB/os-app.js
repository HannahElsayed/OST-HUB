/* Operating Systems content: lectures 1-4, visualizations, simulators, quizzes, flashcards. Exposed as window.OS. */
(function(){
/* ============ helpers ============ */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const PAL=['#8f63c7','#c4608a','#4f7fc9','#b9533a','#6b57c4','#3f9a8a','#a8508f','#7a6bb5'];

/* ============ LECTURE CONTENT ============ */
const LEC={
1:{title:'Lecture 1 — Introduction & Concepts',sub:'إيه هو الـ OS؟ بيعمل إيه؟ وأنواع الأنظمة',topics:[
{t:'What is an Operating System?',ta:'يعني إيه Operating System',i:'🖥️',
 an:'تخيّل مطعم كبير: الزباين هما البرامج (Chrome, Games, Word) والمطبخ والأدوات هما الـ <b>hardware</b>. مين اللي بيقرر مين ياخد الطباخ ومين ياخد الفرن؟ ده <b>مدير المطعم</b> = الـ <b>Operating System</b>.',
 th:['A software that <b>controls</b> the hardware: processors, storage, I/O devices, communication devices and data.','A software that <b>manages</b> the hardware.','A software that acts as a <b>resource allocator</b>.','OS = a program that controls the execution of application programs, and coordinates all software activities inside the computer.'],
 ar:['الـ OS برنامج بيتحكم في الـ <b>hardware</b> وبيوزّع الموارد (CPU, memory, I/O) على البرامج.','يعني بدل ما كل برنامج يخبّط في الجهاز لوحده، الـ OS هو اللي بينظّم الدنيا.','3 كلمات لازم تحفظها في التعريف: <b>controls / manages / resource allocator</b>.'],
 ex:'لما تفتح <b>Chrome</b> و <b>Spotify</b> مع بعض، الـ OS هو اللي بيدّي كل واحد وقت <b>CPU</b> وجزء من الـ <b>RAM</b> عشان الاتنين يشتغلوا من غير ما يتخانقوا.',
 tip:'سؤال متكرر: "Define the OS" — اكتب الـ 3 تعريفات (controls, manages, resource allocator) + إنه بيتحكم في تنفيذ الـ application programs.'},
{t:'Operating System Objectives',ta:'أهداف الـ OS',i:'🎯',
 an:'الـ OS زي <b>مدير فندق</b>: عايز الضيوف مرتاحين (Convenience)، الغرف مستغلة صح (Efficiency)، الأمن موجود (Protection)، ويقدر يجدد الفندق من غير ما يقفله (Ability to evolve).',
 th:['<b>Convenience</b>: makes the computer more convenient to use.','<b>Ease of Communication</b>: between computer and user (friendly UI) and among system components.','<b>Abstraction</b>: hardware-independent programming model.','<b>Efficiency</b>: resources are used in an efficient manner.','<b>Monitoring and Alerting</b>: monitors and alerts failures/problems.','<b>Ability to Evolve</b>: develop/test/introduce new functions without interfering with services.','<b>Protection</b>: security layer to protect users\' data.','<b>Increasing performance</b>: maximize throughput, minimize time to execute commands.'],
 ar:['الأهداف الـ 8: <b>C</b>onvenience – <b>E</b>ase of communication – <b>A</b>bstraction – <b>E</b>fficiency – <b>M</b>onitoring – <b>E</b>volve – <b>P</b>rotection – <b>P</b>erformance.','<b>Abstraction</b> يعني تكتب برنامجك من غير ما تعرف الـ hardware بالتفصيل (مش فارق عندك نوع الـ disk).','<b>Throughput</b> = عدد الشغل اللي بيخلص في الوقت.'],
 ex:'بتكتب <code>print("hi")</code> من غير ما تعرف الشاشة ماركة إيه — ده <b>Abstraction</b>. والـ OS لو حصل failure في device بيطلّعلك error — ده <b>Monitoring & Alerting</b>.',
 tip:'احفظهم بالـ story: مدير الفندق. ممكن السؤال "List four objectives of an OS".',viz:'objectives'},
{t:'Services Provided by the OS',ta:'الخدمات اللي بيقدمها الـ OS',i:'🛎️',
 an:'الـ OS زي <b>خدمة العملاء</b>: بيديك أدوات تكتب بيها (editors/debuggers)، يشغّل برنامجك، يخليك تستخدم الطابعة، يحمي ملفاتك، ويسجّل مين استخدم إيه (accounting).',
 th:['<b>Program development</b>: editors and debuggers.','<b>Program execution</b>: load program and data, initialize environment.','<b>Access to I/O devices</b>: read from/write to ports and units.','<b>Controlled access to data</b>: access protection.','<b>System access</b>: user authentication.','<b>Error detection and response</b>: internal/external hardware errors (memory error, device failure) and software errors (arithmetic overflow, access to forbidden memory locations).','<b>Accounting</b>: collect statistics, monitor performance, anticipate future enhancements, billing users.'],
 ar:['<b>Error detection</b> نوعين: أخطاء hardware (memory error / device failure) وأخطاء software (arithmetic overflow / الوصول لمكان ممنوع في الـ memory).','<b>Accounting</b> = تجميع إحصائيات وقياس الأداء، وممكن تُستخدم في الفواتير (billing).','<b>System access</b> = الـ login والـ authentication.'],
 ex:'برنامج بيقسم على صفر ➜ <b>arithmetic error</b> ➜ الـ OS يعرض error message ويوقف البرنامج بدل ما الجهاز كله يهنّج.',
 tip:'اسأل نفسك: الخدمة دي ليها علاقة بإيه؟ (تطوير – تشغيل – I/O – بيانات – دخول – أخطاء – إحصائيات).'},
{t:'Functions of an OS on a Network',ta:'وظايف الـ OS على الشبكة',i:'🌐',
 an:'الـ OS في شبكة زي <b>مسؤول المكتب</b>: بيوزّع الطابعة على الكل، بيخلي الناس تشارك الملفات، ومينفعش حد يبوّظ شغل التاني.',
 th:['Sharing H/W among users.','Allowing users to share data.','Preventing users from interfering with one another.','Scheduling resources among users.','Organizing data for secure and rapid access.','Handling network communications.'],
 ar:['الـ 6 وظايف: share hardware – share data – منع التداخل – scheduling للموارد – تنظيم البيانات – إدارة الاتصالات.'],
 ex:'3 طلبة بيطبعوا في نفس الوقت على طابعة واحدة ➜ الـ OS بيعمل <b>queue</b> ويرتّب الطلبات (scheduling) من غير ما الطباعة تتلخبط.',
 tip:'الكلمات المفتاحية: Sharing, Preventing interference, Scheduling, Secure & rapid, Network communications.'},
{t:'Components of a Computer System & Layers',ta:'مكونات الجهاز والطبقات',i:'🧱',
 an:'تخيل <b>عمارة</b>: الأساس = hardware، فوقه الـ OS، فوقه الـ utilities، وفي الدور الأخير الـ applications اللي المستخدم بيشوفها.',
 th:['Input devices · Processing devices (CPU) · Output devices · Storage devices.','<b>Applications software</b>: word processing, spreadsheet, database.','<b>System software</b>: operating system, utilities.','<b>Users (end users)</b> need the output; <b>programmers</b> write programs to supply it.','Layers (top→bottom): End User → Application Programs → Utilities → Operating System → Computer Hardware. The <b>OS designer</b> works at the hardware level.'],
 ar:['الـ <b>End user</b> بيتعامل مع الـ application programs بس.','الـ <b>Programmer</b> بيتعامل مع الـ utilities والـ OS.','الـ <b>OS designer</b> بيتعامل مع الـ hardware مباشرة.','دوس على أي طبقة تحت عشان تعرف شرحها 👇'],
 ex:'أنت (end user) بتفتح Word ➜ Word (application) بيطلب من الـ OS يفتح ملف ➜ الـ OS يكلّم الـ disk (hardware).',
 tip:'ارسم الطبقات الخمسة وارسم مين بيتعامل مع كل طبقة (3 أسهم).',viz:'layers'},
{t:'Computer-System Operation',ta:'الـ CPU والـ I/O بيشتغلوا إزاي',i:'⚙️',
 an:'الـ CPU <b>مدير مكتب</b>، كل <b>device controller</b> سكرتير لقسم (طابعة، disk، tape) وعنده <b>درج صغير = local buffer</b>. المدير بيدّي السكرتير الشغل ويكمّل شغله من غير ما يستنى!',
 th:['I/O devices and the CPU can execute <b>concurrently</b>.','Each <b>device controller</b> is responsible for a particular device type.','Each device controller has a <b>local buffer</b> (memory).','CPU moves data from/to main memory to/from the local buffers.','I/O is from the device to the local buffer of the controller.','Devices connect through the <b>system bus</b> (CPU, disk/printer/tape controllers, memory controller).'],
 ar:['الـ CPU والـ I/O بيشتغلوا <b>في نفس الوقت</b> (concurrently).','الـ CPU هو اللي بينقل الداتا بين الـ main memory والـ local buffer، لكن الـ I/O نفسه بيحصل بين الجهاز والـ buffer بتاع الـ controller.'],
 ex:'بتطبع ملف: الـ CPU ينقل الداتا لـ buffer بتاع الـ <b>printer controller</b> وبعدين يكمّل شغل تاني، والطابعة بتطبع لوحدها.',
 tip:'اتذكر: <b>controller لكل نوع device + local buffer</b>.'},
{t:'Storage-Device Hierarchy',ta:'هرم التخزين',i:'🔺',
 an:'مكتبتك: الكتاب اللي في إيدك (registers) أسرع حاجة لكن بتشيل قليل جداً. الرف جنبك (cache)، الدولاب (main memory)، المخزن (disk)، والأرشيف (tape) — كل ما تبعد بيرخص ويتسع لكن أبطأ.',
 th:['Storage systems are organized in a hierarchy by <b>Speed</b>, <b>Cost</b>, and <b>Volatility</b>.','Order (top→bottom): registers → cache → main memory → electronic disk → magnetic disk → optical disk → magnetic tapes.','Going down: speed ↓, cost per byte ↓, capacity ↑, becomes non-volatile.'],
 ar:['فوق: سريع جداً + غالي + <b>volatile</b> (بيفقد البيانات لما الكهربا تقطع).','تحت: أبطأ + أرخص + <b>non-volatile</b> (البيانات بتفضل).','دوس على كل مستوى في الهرم 👇'],
 ex:'لما ترفع الكهربا: اللي في RAM بيضيع، واللي على الـ hard disk بيفضل.',
 tip:'ارسم الهرم وسمّي الـ 7 مستويات بالترتيب — سؤال كلاسيكي.',viz:'pyramid'},
{t:'What is a Kernel?',ta:'الـ Kernel',i:'🫀',
 an:'الـ Kernel هو <b>قلب</b> الـ OS. حواليه طبقة <b>Services</b>، وبره خالص الـ <b>User processes</b> بيطلبوا الخدمات.',
 th:['Kernel is responsible for (as listed in the lecture): memory allocation, garbage collection, object finalization, module termination, interfacing to the underlying OS and clock functions.','Diagram: Kernel (center) → Services → User Processes (outer ring).'],
 ar:['اللي في المحاضرة: الـ kernel مسؤول عن <b>Memory allocation, Garbage collection, Object finalization, Module termination, Interfacing to the underlying OS and clock functions</b>.','لاحظ الرسمة: دايرة في النص (Kernel) → حلقة (Services) → حلقة برة (User Processes).'],
 ex:'<pre>   ┌─────── User Processes ───────┐\n   │   ┌────── Services ─────┐    │\n   │   │       [ Kernel ]     │    │\n   │   └──────────────────────┘    │\n   └───────────────────────────────┘</pre>',
 tip:'احفظ الخمس نقط بالترتيب: Memory alloc → Garbage collection → Object finalization → Module termination → Interfacing/clock.'},
{t:'Types of Computer Systems',ta:'أنواع الأنظمة (8 أنواع)',i:'🗂️',
 an:'8 أنواع، دوس على كل كارت تشوف الـ analogy والنقط المهمة 👇',
 th:['Simple Batch · Multi-programmed Batch · Time-Sharing · Personal (Desktop) · Parallel · Distributed · Real-Time · Handheld'],
 ar:['الحفظ بالـ keywords: <b>Batch = one job</b>, <b>Multi-programmed = more than one in memory</b>, <b>Time-sharing = low response time</b>, <b>Parallel = 2+ CPUs share bus</b>, <b>Distributed = network</b>, <b>Real-time = deadlines</b>.'],
 ex:'',tip:'في الامتحان غالباً "Compare between batch & time-sharing" أو "Hard vs Soft real-time".',viz:'types'},
{t:'Computer Categories vs. Systems',ta:'أنواع الأجهزة وبتستخدم أنهي نظام',i:'📱',
 an:'كل ما الجهاز أكبر، قدرته أكبر: Mobile ➜ Micro ➜ Midrange ➜ Mainframe ➜ Supercomputer.',
 th:['<b>Mobile devices</b>: very small wireless phone/pager-based devices; limited Internet access.','<b>Microcomputers (PCs)</b>: computer-on-a-chip (microprocessor), PC-compatible (Intel) and Macintosh.','<b>Midrange (minicomputers)</b>: between micro and mainframe.','<b>Mainframes</b>: high-volume business transactions, 24 hours a day.','<b>Supercomputers</b>: extreme speed & accuracy, often many linked PCs/microprocessors.'],
 ar:['الربط اللي لازم تحفظه ده بالظبط 👇'],
 ex:'<table><tr><th>Computer category</th><th>System type</th></tr><tr><td>Mobile devices</td><td>Handheld systems</td></tr><tr><td>Microcomputers</td><td>Desktop systems</td></tr><tr><td>Midrange computers</td><td>Desktop &amp; Real-time systems</td></tr><tr><td>Mainframe computers</td><td>Batch &amp; Time-share (Hybrid)</td></tr><tr><td>Supercomputers</td><td>Parallel &amp; Distributed systems</td></tr></table>',
 tip:'سؤال جاهز: "Match each category to its system type" — الجدول ده هو الإجابة.'}
]},
2:{title:'Lecture 2 — Operating System Structures',sub:'Components, Interrupts, I/O, System Calls, Structures, Virtual Machines',topics:[
{t:'Common System Components',ta:'مكونات الـ OS الأساسية (8)',i:'🧩',
 an:'الـ OS كأنه <b>وزارة فيها 8 إدارات</b>، كل إدارة مسؤولة عن حاجة.',
 th:['Process Management','Main Memory Management','Secondary-Storage Management','I/O System Management','File Management','Protection System','Networking','Command-Interpreter System'],
 ar:['الـ 8 دول لازم تعرفهم بالترتيب. هنشرحهم واحد واحد تحت.','حفظ سريع: <b>P-M-S-I-F-P-N-C</b> ➜ "Pink Magic Stars In Fairy Palace Near Castle" 🌸'],
 ex:'',tip:'ممكن السؤال: "List the common system components of an OS".'},
{t:'Process, Memory & Secondary-Storage Management',ta:'إدارة الـ Process والـ Memory والـ Disk',i:'🗃️',
 an:'الـ OS <b>مدير مستودع</b>: يعرف كل رف مين شاغله (memory)، يقرر مين يدخل لما يبقى في مكان، ويوزّع المساحة. أما الـ disk فهو المخزن الكبير اللي بيحتفظ بالحاجات.',
 th:['<b>Process</b> = program in execution; needs CPU time, memory, files, I/O devices. OS: process creation/deletion, suspension/resumption, mechanisms for process synchronization and communication.','<b>Main memory</b> = large array of words/bytes, each with its own address; <b>volatile</b>. OS: keep track of which parts are used and by whom; decide which processes to load when space is available; allocate/de-allocate memory.','<b>Secondary storage</b> backs up main memory (volatile & too small). OS: free-space management, storage allocation, disk scheduling.'],
 ar:['Process = برنامج بيتنفّذ. محتاج CPU وmemory وfiles وI/O.','Main memory <b>volatile</b> يعني بيضيع محتواه لو السيستم وقع.','Secondary storage (disks) بتدعم الـ main memory لأنها أكبر ومش volatile.'],
 ex:'<b>Disk scheduling</b>: لو 5 طلبات قراءة جاية على الـ disk، الـ OS بيرتّبهم بطريقة تقلل حركة الـ head.',
 tip:'اتذكر 3 activities لكل واحدة: Process (create/delete – suspend/resume – sync/communicate). Memory (track – decide – allocate). Disk (free space – allocation – scheduling).'},
{t:'I/O System Management',ta:'إدارة الـ I/O',i:'🔌',
 an:'الـ I/O system زي <b>مكتب بريد</b>: عنده صندوق مؤقت (buffer-caching)، شباك موحّد (device-driver interface)، وموظف متخصص لكل نوع طرد (specific drivers).',
 th:['The I/O system consists of: a <b>buffer-caching system</b>, a general <b>device-driver interface</b>, and <b>drivers</b> for specific hardware devices.','I/O devices and CPU can execute concurrently; each controller handles one device type and has a local buffer.','The controller informs the CPU that it finished by causing an <b>interrupt</b>.'],
 ar:['3 مكونات: buffer-caching + general driver interface + specific drivers.','لما الـ controller يخلص شغله بيبعت <b>interrupt</b> للـ CPU.'],
 ex:'',tip:'اربط: controller يخلّص ➜ interrupt ➜ CPU يرد.'},
{t:'Interrupts',ta:'الـ Interrupts (مقاطعات)',i:'🔔',
 an:'بتذاكر وفجأة <b>الموبايل رنّ</b> 📱. بتسجّل صفحة وصلت لها (save state)، ترد على المكالمة (ISR)، وترجع تكمّل من نفس النقطة (restore state). كده الـ interrupt!',
 th:['Interrupts transfer control to the <b>interrupt service routine (ISR)</b>, generally through the <b>interrupt vector</b> (addresses of all service routines).','The architecture must <b>save the address of the interrupted instruction and the CPU state</b>.','Incoming interrupts are <b>disabled</b> while another is processed, to prevent a <b>lost interrupt</b>.','A <b>trap</b> is a software-generated interrupt caused by an error or a user request.','An operating system is <b>interrupt driven</b>.','<b>Classes</b>: Program (arithmetic overflow, division by zero, illegal instruction, reference outside user\'s memory space), Timer, I/O, Hardware failure.','<b>Interrupt handler</b>: program that determines the nature of the interrupt and performs needed actions; generally part of the OS.'],
 ar:['<b>Interrupt vector</b> = جدول فيه عناوين كل الـ ISRs.','الـ <b>trap</b> = interrupt بيحصل من <b>software</b> (error أو طلب من اليوزر).','في الـ <b>interrupt cycle</b>: بعد كل instruction الـ CPU بيشيّك لو في interrupt معلّق؛ لو مفيش يجيب الـ instruction اللي بعدها، ولو فيه يوقف البرنامج وينفّذ الـ handler.','دوس Next وشوف الخطوات 👇'],
 ex:'<b>Example من المحاضرة:</b> CPU بيشغّل برنامج ➜ اليوزر يدوس key ➜ OS يحفظ CPU state ➜ CPU يروح للـ ISR ➜ ISR تخلص ➜ OS يرجّع CPU state ➜ البرنامج الأصلي يكمّل.',
 tip:'اتحفظ: Classes = Program / Timer / I/O / Hardware failure. و Trap = software.',viz:'interrupt'},
{t:'Multiple Interrupts',ta:'لو جه أكتر من interrupt',i:'🔔🔔',
 an:'بتكلم في التليفون (interrupt 1) وفجأة جه اتصال طوارئ (interrupt 2). ممكن: تخلّي التاني يستنى (<b>sequential</b>) أو تقاطع الأول عشان الأهم (<b>priorities / nested</b>).',
 th:['<b>Disable interrupts</b> while one is being processed: the processor ignores new interrupt request signals.','<b>Sequential order</b>: interrupts remain pending until the processor enables interrupts; after the handler completes, the processor checks for additional interrupts.','<b>Priorities</b>: higher-priority interrupts cause lower-priority ones to wait, and can interrupt a lower-priority handler (nested). Example: input arriving from a communication line must be absorbed quickly to make room for more input.'],
 ar:['Sequential = واحد ورا التاني (بسيط). Nested = الأعلى أولوية يقاطع الأقل (أسرع للأحداث المهمة).'],
 ex:'<pre>(a) Sequential:  User ──► Handler X ──► Handler Y ──► User\n(b) Nested:      User ──► Handler X ──► (Y higher priority) Handler Y\n                              ◄── back to X ◄── back to User</pre>',
 tip:'ارسم الشكلين (a) و (b) — بيجي في الامتحان.'},
{t:'I/O Structure: Sync, Async & DMA',ta:'الـ I/O: Synchronous / Asynchronous / DMA',i:'⏳',
 an:'<b>Synchronous</b>: تطلب بيتزا وتقف عند الباب تستنى لحد ما توصل. <b>Asynchronous</b>: تطلب وتكمّل مذاكرتك والدليفري يرن لما يوصل. <b>DMA</b>: الدليفري يدخل البيتزا للمطبخ بنفسه من غير ما تتدخل.',
 th:['<b>Synchronous</b>: after I/O starts, control returns only after I/O completes.','<b>Asynchronous</b>: after I/O starts, control returns to the program <b>without waiting</b>; the process must check device status (or be interrupted) to know when I/O is complete.','Requests for I/O on busy devices must be <b>queued</b> until the device is available.','<b>DMA</b>: for high-speed I/O devices; the controller transfers <b>blocks</b> of data from buffer storage directly to main memory <b>without CPU intervention</b>. The H/W is called a <b>DMA channel</b>.'],
 ar:['الـ synchronous = الـ process <b>بتستنى</b> (waiting). الـ asynchronous = بتكمّل وتعرف بعدين.','الـ DMA بيوفّر وقت الـ CPU لأنه مش بيتدخل في كل byte.'],
 ex:'',tip:'Compare Sync vs Async في جدول (Cheatsheet) — سؤال مضمون.',viz:'io'},
{t:'File Management, Protection & Command Interpreter',ta:'الملفات والحماية والـ Shell',i:'📁',
 an:'<b>File</b> = ملف في مكتب. <b>Protection</b> = الحرّاس اللي يقرروا مين يدخل الأوضة. <b>Shell</b> = موظف الاستقبال اللي بياخد أوامرك وينفّذها.',
 th:['<b>File</b>: a collection of related information defined by its creator (programs in source/object form and data). OS: file creation/deletion, directory creation/deletion, primitives for manipulating files/directories, file backup on stable (non-volatile) media.','<b>Protection</b>: mechanism for controlling access by programs, processes, or users to system and user resources. Must: distinguish authorized vs unauthorized usage, specify the controls, provide a means of enforcement.','<b>Command interpreter</b> (control-card interpreter / command-line interpreter / <b>shell</b> in UNIX): gets and executes the next command statement (process creation, I/O, storage, memory, file-system access, protection, networking).'],
 ar:['Protection لازم يعمل 3 حاجات: <b>يفرّق (distinguish)</b> – <b>يحدد الـ controls</b> – <b>يفرض (enforce)</b>.','الـ shell هو برنامج بيقرا الأوامر ويشغّلها (زي الـ terminal).'],
 ex:'<code>ls</code> أو <code>cd</code> في UNIX ➜ الـ shell بيقراها وبيطلب من الـ OS ينفّذها.',tip:'Command interpreter له 3 أسماء: control-card interpreter / command-line interpreter / shell.'},
{t:'System Calls',ta:'الـ System Calls',i:'📞',
 an:'الـ system call زي <b>شباك التذاكر</b>: البرنامج مش بيدخل الـ OS بنفسه، بيطلب من الشباك والـ OS ينفّذ ويرجّعله النتيجة.',
 th:['System calls provide the <b>interface between a running program and the OS</b>.','Generally available as assembly-language instructions; languages like C allow system calls directly.','<b>3 methods to pass parameters</b>: (1) in <b>registers</b>; (2) store them in a <b>table in memory</b> and pass the table address; (3) <b>push onto the stack</b> by the program and pop by the OS.'],
 ar:['3 طرق لتمرير الـ parameters: <b>registers</b> (إيدك لإيده)، <b>table in memory</b> (تديله عنوان الدرج)، <b>stack</b> (تحط الورق في طبق وهو ياخده).'],
 ex:'<pre>open("file.txt")  → system call → OS opens the file → returns file handle\n; parameters can travel via: registers | memory table | stack</pre>',
 tip:'سؤال: "What are the methods used to pass parameters to the OS?" — registers, table, stack.'},
{t:'System Programs',ta:'الـ System Programs',i:'🧰',
 an:'System programs هي <b>عدة الشغل</b> اللي حوالين الـ OS، وأغلب المستخدمين بيشوفوها هي "الـ OS" نفسه.',
 th:['Provide a convenient environment for program development and execution. Categories: File manipulation · Status information · File modification · Programming language support · Program loading and execution · Communications · Application programs.','Most users\' view of the OS is defined by <b>system programs</b>, not the actual system calls.'],
 ar:['7 فئات. والنقطة المهمة: اليوزر شايف الـ system programs مش الـ system calls.'],
 ex:'Text editor (file modification) · Compiler (programming language support) · Loader (program loading) · Email (communications).',tip:'ممكن يسألوك تدّي مثال لكل فئة.'},
{t:'System Structure',ta:'تصميم الـ OS: MS-DOS / UNIX / Layered',i:'🏗️',
 an:'<b>MS-DOS</b> = شقة صغيرة من غير حيطان فاصلة. <b>UNIX</b> = عمارة دورين (programs + kernel الكبير). <b>Layered</b> = عمارة طوابق كل طابق بيستخدم اللي تحته بس.',
 th:['<b>MS-DOS</b>: written to provide the most functionality in the least space; <b>not divided into modules</b>; interfaces and levels are not well separated; executes <b>one process at a time</b>.','<b>UNIX</b>: limited by hardware functionality → two parts: <b>system programs</b> and the <b>kernel</b> (everything below system-call interface and above hardware: file system, CPU scheduling, memory management... a large number of functions in one level). Can run multiple programs.','<b>Layered approach</b>: OS divided into layers; bottom layer 0 = hardware, top layer N = user interface; each layer uses only <b>lower-level</b> layers.','First layered OS: layer 5 user programs · layer 4 buffering for I/O · layer 3 operator-console device driver · layer 2 memory management · layer 1 CPU scheduling · layer 0 hardware.'],
 ar:['MS-DOS: بسيط، مش modular، بيشغّل process واحدة بس.','UNIX: kernel ضخم في طبقة واحدة فيها كل حاجة.','Layered: modular وسهل الـ debugging لأن كل طبقة بتعتمد على اللي تحتها بس.','دوس على الطبقات 👇'],
 ex:'',tip:'ارسم الـ 6 layers وسمّيهم بالترتيب: 5 user programs ← 0 hardware.',viz:'layers6'},
{t:'Virtual Machines',ta:'الـ Virtual Machines',i:'🪞',
 an:'عمارة واحدة اتقسمت لشقق كل شقة فاكرة نفسها عمارة لوحدها! كل VM فاكرة إنها جهاز كامل بالـ CPU والـ memory بتاعها.',
 th:['A VM takes the layered approach to its logical conclusion: treats hardware + OS kernel as though they were all hardware.','Provides an interface <b>identical to the bare hardware</b>; the OS creates the illusion of multiple processes each with its own processor and (virtual) memory.','Resources are shared: CPU scheduling gives each user the appearance of its own processor; spooling + file system give virtual line printers/card readers.','<b>Advantages</b>: complete protection (each VM isolated); perfect vehicle for OS research and development (does not disrupt normal system operation).','<b>Disadvantages</b>: isolation permits <b>no direct sharing</b> of resources; hard to implement (exact duplicate of the underlying machine).'],
 ar:['<b>ميزة:</b> حماية كاملة + مناسب لتطوير الـ OS من غير ما تبوّظ الجهاز.','<b>عيوب:</b> مفيش sharing مباشر + صعب في التنفيذ.'],
 ex:'<pre>Non-virtual:      Virtual Machine:\n processes         processes | processes | processes\n kernel            kernel    | kernel    | kernel\n hardware          ────── virtual machine ──────\n                   ────────── hardware ─────────</pre>',
 tip:'Advantages/Disadvantages of VM = سؤال مضمون.'},
{t:'System Design, Implementation, Mechanisms vs Policies',ta:'التصميم والتنفيذ والـ Mechanism vs Policy',i:'🛠️',
 an:'<b>Mechanism</b> = الإزاي (السيارة بتمشي إزاي). <b>Policy</b> = القرار (هتروح فين وبأي سرعة). لو فصلتهم تقدر تغيّر القرار من غير ما تعيد بناء السيارة.',
 th:['<b>User goals</b>: convenient, easy to learn, reliable, safe, fast.','<b>System goals</b>: easy to design/implement/maintain, flexible, reliable, error-free, efficient.','Traditionally in assembly; now in <b>high-level languages</b>: written faster, more compact, easier to understand/debug, easier to <b>port</b>.','<b>Mechanisms</b> determine <b>how</b> to do something; <b>policies</b> decide <b>what</b> will be done. Separating policy from mechanism gives maximum flexibility if policy decisions change later.'],
 ar:['Mechanism = <b>HOW</b> / Policy = <b>WHAT</b>. اتحفظهم كده عشان ماتتلخبطش.','تكتب الـ OS بلغة high-level ➜ أسهل في الـ porting (النقل لـ hardware تاني).'],
 ex:'Mechanism: الـ timer بيقطع الـ CPU كل شوية (إزاي). Policy: مدة الـ time slice كام ms (إيه).',tip:'Mechanism=How, Policy=What — أسهل 2 درجات في الامتحان 😄'}
]},
3:{title:'Lecture 3 — Processes',sub:'Process concept, states, PCB, scheduling, threads, IPC',topics:[
{t:'Process Concept',ta:'يعني إيه Process',i:'🏃',
 an:'<b>البرنامج</b> = وصفة الأكل مكتوبة في كتاب (ساكنة). <b>الـ Process</b> = الطباخ وهو بيطبخ بالوصفة فعلاً (شغّالة).',
 th:['<b>Process</b> – a program in execution; the entity to which processors are assigned, the "dispatchable" unit, or the "locus of control" of a procedure in execution.','Textbooks use the terms <b>job</b> and <b>process</b> almost interchangeably.'],
 ar:['Program = ملف على الـ disk (passive). Process = البرنامج وهو شغّال (active).','الـ job والـ process بيتستخدموا تقريباً بنفس المعنى.'],
 ex:'تفتح Chrome مرتين = <b>برنامج واحد</b> لكن <b>2 processes</b>.',tip:'Definition: "a program in execution" — الجملة دي لازم تتكتب حرفياً.'},
{t:'Process State',ta:'حالات الـ Process',i:'🚦',
 an:'تخيل <b>مستشفى</b>: New = وصل واتسجّل، Ready = قاعد في الاستقبال مستني دوره، Running = جوه عند الدكتور، Waiting = بيعمل تحاليل ومستني النتيجة، Terminated = خرج.',
 th:['<b>New</b>: the process is being created.','<b>Running</b>: instructions are being executed (has the CPU).','<b>Waiting (blocked)</b>: waiting for some event (e.g., I/O completion).','<b>Ready</b>: waiting to be assigned to a processor (could use the CPU).','<b>Terminated</b>: finished execution.','Transitions: new→ready <i>admitted</i> · ready→running <i>scheduler dispatch</i> · running→ready <i>interrupt</i> · running→waiting <i>I/O or event wait</i> · waiting→ready <i>I/O or event completion</i> · running→terminated <i>exit</i>.','<b>One process may run at a time</b> — several may be ready or waiting. Ready list is in <b>priority order</b>; waiting list is <b>unordered</b> unless waiting for the same event.'],
 ar:['فكرة مهمة: <b>waiting</b> مش بيرجع لـ <b>running</b> مباشرة؛ لازم يمر على <b>ready</b> الأول.','جرّب بنفسك في الـ simulator تحت وحاول تعمل transition غلط 👇'],
 ex:'بتحمّل ملف: process بتبقى <b>running</b> ➜ تطلب قراءة من الـ disk ➜ <b>waiting</b> ➜ الـ disk يخلص (interrupt) ➜ <b>ready</b> ➜ scheduler dispatch ➜ <b>running</b>.',
 tip:'ارسم الـ state diagram بالـ 6 transitions بأسمائهم — أهم رسمة في المحاضرة.',viz:'state'},
{t:'Process Control Block (PCB)',ta:'الـ PCB — كارت بيانات الـ process',i:'🪪',
 an:'الـ PCB زي <b>بطاقة الرقم القومي</b> للـ process: فيها اسمها (ID)، حالتها، مين أبوها، مين ولادها، وإيه الموارد اللي معاها.',
 th:['PCB = <b>process descriptor</b>: data structure with information about the process:','Current <b>state</b>.','Unique <b>identification</b>.','Pointer to the process\'s <b>parent</b>.','Pointer to the process\'s <b>child</b>.','Pointers to allocated <b>resources</b> (e.g., memory range).','<b>CPU scheduling</b> information.'],
 ar:['الـ PCB اسمها التاني <b>process descriptor</b>.','لما الـ OS يعمل context switch بيحفظ ويرجّع الـ info من الـ PCB.'],
 ex:'<pre>PCB { state: ready, pid: 4021, parent: 1530, child: 4022,\n      memory: 0x4000-0x7FFF, priority: 3 }</pre>',tip:'6 حاجات في الـ PCB: state, ID, parent, child, resources, scheduling info.'},
{t:'Process Scheduling Queues & Schedulers',ta:'الـ Queues والـ Schedulers',i:'📋',
 an:'<b>مطار</b>: الـ long-term scheduler = موظف البوابة اللي يقرر مين يدخل المطار (ready queue). الـ short-term = برج المراقبة اللي يقرر أنهي طيارة تقلع دلوقتي (CPU). الـ medium-term = بيطلّع طيارات مؤقتاً للانتظار (swap out).',
 th:['<b>Job queue</b>: set of all processes in the system.','<b>Ready queue</b>: processes in main memory, ready and waiting to execute.','<b>Device queues</b>: processes waiting for an I/O device. Processes migrate between queues.','<b>Long-term scheduler (job scheduler)</b>: selects which processes are brought into the ready queue; invoked <b>very infrequently</b> (seconds/minutes — may be slow); controls the <b>degree of multiprogramming</b>.','<b>Short-term scheduler (CPU scheduler)</b>: selects which process executes next and allocates the CPU; invoked <b>very frequently</b> (milliseconds — must be fast).','<b>Medium-term scheduling</b>: swap in / swap out partially executed processes.'],
 ar:['Long = بطيء، بيتحكم في عدد البرامج في الـ memory (degree of multiprogramming).','Short = سريع جداً، بيختار مين ياخد الـ CPU.','Medium = swap in / swap out.'],
 ex:'',tip:'جدول المقارنة بين Long/Short في الـ Cheatsheet — مضمون في الامتحان.',viz:'sched'},
{t:'I/O-bound vs CPU-bound',ta:'نوعين من الـ processes',i:'⚖️',
 an:'<b>I/O-bound</b> = موظف استقبال: يرد على ناس كتير بسرعة (قصير) لكن معظم وقته مستني. <b>CPU-bound</b> = عالم رياضيات: قاعد يحسب مسألة واحدة ساعات.',
 th:['<b>I/O-bound</b>: spends more time doing I/O than computation; <b>many short CPU bursts</b>. (Example in lecture: Scanner)','<b>CPU-bound</b>: spends more time computing; <b>few very long CPU bursts</b>. (Example: Calculator)'],
 ar:['I/O-bound = bursts كتير <b>وقصيرة</b>. CPU-bound = bursts قليلة <b>وطويلة</b>.','الـ scheduler الشاطر بيخلط النوعين عشان الـ CPU والـ I/O الاتنين يفضلوا مشغولين.'],
 ex:'تشغيل <b>video encoder</b> = CPU-bound. تحميل ملفات من النت = I/O-bound.',tip:'متنساش الأمثلة اللي في الشرايح: Scanner (I/O) و Calculator (CPU).'},
{t:'Operations on Processes (Create / Terminate)',ta:'إنشاء وإنهاء الـ processes',i:'🌳',
 an:'<b>شجرة العيلة</b>: كل ابن له أب واحد بس، لكن الأب ممكن يبقى له أكتر من ابن.',
 th:['Operations: create, destroy, suspend, resume, change priority, block, wakeup, dispatch, enable IPC.','<b>Creation</b>: name the process, insert it in the process table, set initial priority, create the PCB, allocate initial resources.','The creating process = <b>parent</b>; the created = <b>child</b>. Result: hierarchical tree — each child has <b>one parent</b>, each parent may have <b>more than one child</b>.','Resource sharing: parent and children share all / a subset / no resources. Execution: run concurrently, or parent waits until children terminate.','<b>Termination</b>: remove from system, return resources, erase PCB. Some systems destroy children when the parent is destroyed; others let them continue.'],
 ar:['خطوات الـ creation: اسم ➜ process table ➜ priority ➜ PCB ➜ resources.','خطوات الـ termination: شيلها ➜ رجّع الموارد ➜ امسح الـ PCB.','دوس على أي node في الشجرة 👇'],
 ex:'',tip:'Resource sharing (3 احتمالات) + Execution (2 احتمالات) — اتذكرهم.',viz:'tree'},
{t:'Threads',ta:'الـ Threads',i:'🧵',
 an:'الـ Process = <b>شقة</b>. الـ Threads = <b>ساكنين الشقة</b> بيتشاركوا المطبخ والحمام (code/data/resources) لكن كل واحد له أوضته وحاجته الخاصة (PCB/registers/stack).',
 th:['A <b>thread (lightweight process)</b> is a basic unit of CPU utilization; it has its <b>own PCB</b>.','A thread shares with its peer threads: <b>code section, data section, OS resources</b> — collectively known as a <b>task</b>.','A traditional (<b>heavyweight</b>) process = a task with <b>one thread</b>.','In a multi-threaded task, while one thread is blocked, another in the same task can run → higher throughput/performance (e.g., WWW pages; Producer–Consumer sharing a buffer).','<b>Kernel-level</b> threads (Mac, OS/2); <b>User-level</b> threads (Project Andrew from CMU) via a thread library — drawback if the kernel doesn\'t support threads; <b>Hybrid</b> approach (Solaris 2).'],
 ar:['Thread بيتشارك: <b>code + data + OS resources</b>. بيملك لنفسه PCB.','لو thread اتبلوكت، التانية في نفس الـ task تكمّل شغل.'],
 ex:'متصفح الويب: thread لتحميل الصفحة، thread للصور، thread للـ UI — لو الصور بطيئة الـ UI مش بيهنّج.',tip:'Kernel-level vs User-level vs Hybrid + مثال لكل واحد.',viz:'threads'},
{t:'Interprocess Communication (IPC)',ta:'التواصل بين الـ processes',i:'✉️',
 an:'ناس بيتكلموا: يا إما <b>direct</b> (تكلم صاحبك بالاسم)، يا إما <b>indirect</b> (تسيب رسالة في صندوق بريد مشترك).',
 th:['IPC = mechanism for processes to communicate and to synchronize their actions. <b>Message system</b>: no shared variables.','Two operations: <b>send(message)</b> and <b>receive(message)</b>; message size fixed or variable.','To communicate, P and Q need a <b>communication link</b> and to exchange messages via send/receive. Link can be physical (shared memory, hardware bus) or logical.','Logical IPC choices: direct/indirect · symmetric/asymmetric · automatic/explicit buffering · send by copy/by reference · fixed/variable message size.'],
 ar:['IPC = تواصل وتزامن بين الـ processes من غير shared variables.','عمليتين بس: <b>send</b> و <b>receive</b>.'],
 ex:'',tip:'اسم العمليتين: send(message) / receive(message).'},
{t:'Direct vs Indirect Communication',ta:'تواصل مباشر وغير مباشر',i:'📬',
 an:'<b>Direct</b> = رسالة واتساب على رقم معيّن. <b>Indirect</b> = صندوق بريد (mailbox) أي حد معاه المفتاح يقدر يبعت ويستلم.',
 th:['<b>Direct</b>: processes name each other explicitly: <code>send(P, message)</code>, <code>receive(Q, message)</code>. Links are established automatically; a link is associated with exactly <b>one pair</b> of processes; exactly <b>one link</b> between each pair; usually bi-directional.','<b>Indirect</b>: messages go to/from <b>mailboxes (ports)</b> with unique IDs. A link exists only if processes share a common mailbox; a link may be associated with <b>many processes</b>; each pair may share <b>several links</b>; uni- or bi-directional. Operations: create mailbox, send/receive through mailbox, destroy mailbox.'],
 ar:['Direct: لازم تذكر <b>اسم</b> الطرف التاني (P / Q). link واحد بس لكل زوج.','Indirect: بتستخدم <b>mailbox</b> بـ ID. ممكن أكتر من 2 process يشاركوا نفس الـ mailbox.'],
 ex:'<pre>Direct:    P ──send(Q,msg)──► Q\nIndirect:  P ──send(A,msg)──► [ Mailbox A ] ──receive(A,msg)──► Q</pre>',tip:'جدول المقارنة في الـ Cheatsheet.'},
{t:'Buffering',ta:'الـ Buffering (3 أنواع)',i:'📦',
 an:'<b>شباك التذاكر</b>: Zero capacity = مفيش طابور (لازم الموظف والزبون يتقابلوا). Bounded = طابور بيشيل 3 بس. Unbounded = طابور لانهائي.',
 th:['Buffering = a <b>queue of messages</b> attached to the link, implemented in 3 ways:','<b>1. Zero capacity</b> – 0 messages: sender must <b>wait</b> for the receiver.','<b>2. Bounded capacity</b> – finite length of n messages: sender must wait if the link is full.','<b>3. Unbounded capacity</b> – infinite length: sender <b>never waits</b>.'],
 ar:['جرّب الـ simulator: غيّر النوع واضغط Send/Receive وشوف مين بيتبلوك 👇'],
 ex:'',tip:'السؤال: "Explain the three types of buffering" — اكتب الـ 3 مع حالة الـ sender.',viz:'ipc'}
]},
4:{title:'Lecture 4 — CPU Scheduling',sub:'Basic concepts · Scheduling criteria · Scheduling algorithms (FCFS, RR, SJF, Priority, Multilevel Queues, Multiprocessor, Real-Time)',topics:[
{t:'Basic Concepts',ta:'الأساسيات: ليه بنعمل scheduling؟',i:'🧭',
 an:'تخيّل <b>كاشير واحد</b> في سوبر ماركت وقدامه طابور زباين. مدير السوبر ماركت هدفه إن الكاشير <b>ميقعدش فاضي</b> أبداً. لو زبون وقف يدوّر على حاجة نسيها (ده شبه الـ <b>I/O</b>) الكاشير يخدم اللي بعده فوراً. كده بالظبط الـ <b>CPU scheduling</b>: الـ CPU هو الكاشير والـ processes هي الزباين.',
 th:['CPU Scheduling is the <b>basis of multi-programmed OS’s</b>.','The <b>goal</b> of scheduling is to <b>maximize CPU utilization</b>.','<b>Process cycles</b> – during its lifetime, a process goes through a cycle of <b>CPU usage</b> and <b>I/O usage</b>.','The process execution cycle begins with a <b>CPU burst</b>.','The process I/O cycle begins with an <b>I/O burst</b>.'],
 ar:['الـ scheduling هو أساس أي OS بيشغّل أكتر من برنامج.'],
 ex:'<pre>load store / add store / read from file     ← CPU burst\nwait for I/O                                ← I/O burst\nstore increment index / write to file       ← CPU burst\nwait for I/O                                ← I/O burst\nload store / add store / read from file     ← CPU burst\nwait for I/O                                ← I/O burst  ...</pre>',
 tip:'Goal = maximize CPU utilization. والـ execution cycle بتبدأ دايماً بـ CPU burst.'},
{t:'CPU Burst Times',ta:'شكل الـ CPU bursts',i:'📊',
 an:'تخيّل مكالماتك في اليوم: أغلبها <b>دقيقة أو اتنين</b> (قصيرة وكتير)، وقليل جداً مكالمات بتفضل ساعة. ده تقريباً شكل الـ CPU bursts.',
 th:['The frequency of CPU bursts has been <b>extensively measured</b>.','The frequency graph is characterized as <b>exponential or hyper exponential</b>.','CPU bursts typically consist of <b>several short bursts and a few longer bursts</b>.','Figures in the lecture: <b>Sequence of CPU and I/O bursts</b> and <b>Histogram of CPU-burst times</b> (x-axis: burst duration in milliseconds; y-axis: frequency).'],
 ar:['الـ bursts القصيرة هي الأكتر بكتير والطويلة قليلة.'],
 ex:'',tip:'احفظ الجملة: "several short bursts and a few longer bursts" + الرسمة exponential / hyper exponential.',viz:'burst'},
{t:'Preemptive vs. Nonpreemptive Scheduling',ta:'يقدر ياخد الـ CPU بالعافية ولا لأ؟',i:'⏯️',
 an:'<b>Nonpreemptive</b> = مكالمة تليفون محدش يقدر يقطعها لحد ما صاحبها يخلص. <b>Preemptive</b> = ممكن عملية طوارئ (high priority) تقطع المكالمة وتاخد الخط.',
 th:['A scheduling discipline is <b>nonpreemptive</b> if: once a process has the CPU, the CPU can’t be taken from that process.','A scheduling discipline is <b>preemptive</b> if: the CPU can be taken away.','Preemptive is useful in systems in which <b>high-priority processes require rapid attention</b>.','To make preemptive effective, <b>many processes must be kept in primary memory</b> so that the next ready process becomes available for the CPU when it is free.','In nonpreemptive systems, <b>short jobs will wait for long jobs</b>, but treatment of all processes is <b>fair</b>.','In nonpreemptive systems, <b>response time is more predictable</b> because incoming high-priority jobs can’t displace waiting jobs.'],
 ar:['الفرق في سؤال واحد: هل الـ CPU ممكن يتاخد من الـ process وهي شغالة؟'],
 ex:'<table><tr><th></th><th>Nonpreemptive</th><th>Preemptive</th></tr><tr><td>CPU can be taken?</td><td>No</td><td>Yes</td></tr><tr><td>Short jobs</td><td>Wait for long jobs</td><td>Can get the CPU quickly</td></tr><tr><td>Fairness</td><td>All processes treated fairly</td><td>Good for high-priority jobs</td></tr><tr><td>Response time</td><td>More predictable</td><td>Needs many processes in memory</td></tr></table>',
 tip:'اتذكر 3 نقط للـ nonpreemptive: short jobs wait · fair · response time predictable.'},
{t:'Scheduling Levels',ta:'التلات مستويات: High / Intermediate / Low',i:'🪜',
 an:'<b>مطعم مشهور</b>: موظف الاستقبال بيقرر مين يدخل المطعم أصلاً (<b>High-level</b>)، والمدير بيقرر مين يستنى في الصالة ومين يرجع بعدين لو زحمة (<b>Intermediate</b>)، والجرسون بيقرر دلوقتي مين الطاولة اللي هتتخدم (<b>Low-level</b>).',
 th:['<b>High-level scheduling</b> – called <b>job scheduling or admission scheduling</b>; determines which job will gain admission to the system; once admitted, a job becomes processes or groups of processes.','<b>Intermediate-level scheduling</b> – determines which processes shall compete for the CPU; responds to short-term fluctuations by <b>suspending and resuming</b> processes; acts as a <b>buffer</b> between admission of jobs to the system and assigning of the CPU to these jobs.','<b>Low-level scheduling</b> – determines which process will be assigned to the CPU when it next becomes available (<b>dispatch CPU to the process</b>); performed by the <b>dispatcher</b>, which operates many times per second and must reside at all times in primary storage.','<b>Dispatch latency</b> – the time it takes for the dispatcher to stop one process and start another running.'],
 ar:['دوس على الرسمة تحت وشوف مين بيتحرك في كل مستوى.'],
 ex:'',tip:'High = job/admission · Intermediate = suspend/resume · Low = dispatcher. ومتنساش تعريف dispatch latency.',viz:'levels'},
{t:'Scheduling Criteria',ta:'معايير الحكم على أي خوارزمية',i:'📏',
 an:'تخيّل <b>بنك</b>: عايز الموظفين مشغولين طول الوقت (utilization)، وأكبر عدد عملاء يخلصوا (throughput)، وكل عميل يقعد أقل وقت (turnaround)، وميقفش كتير في الطابور (waiting)، وأول ما يوصل حد يرد عليه (response).',
 th:['<b>CPU utilization</b> – keep the CPU as busy as possible.','<b>Throughput</b> – number of processes that complete their execution per time unit.','<b>Turnaround time</b> – amount of time to execute a particular process.','<b>Waiting time</b> – amount of time a process has been waiting in the ready queue.','<b>Response time</b> – amount of time from when a request was submitted until the <b>first response is produced, not output</b> (for time-sharing environments).','<b>Optimization criteria</b>: Max CPU utilization · Max throughput · Min turnaround time · Min waiting time · Min response time.'],
 ar:['اللي بنكبّره: utilization وthroughput. واللي بنصغّره: turnaround وwaiting وresponse.'],
 ex:'<table><tr><th>Criterion</th><th>Meaning</th><th>Goal</th></tr><tr><td>CPU utilization</td><td>CPU as busy as possible</td><td>🔼 Max</td></tr><tr><td>Throughput</td><td>Processes completed per time unit</td><td>🔼 Max</td></tr><tr><td>Turnaround time</td><td>Time to execute a particular process</td><td>🔽 Min</td></tr><tr><td>Waiting time</td><td>Time waiting in the ready queue</td><td>🔽 Min</td></tr><tr><td>Response time</td><td>Submission → first response (not output)</td><td>🔽 Min</td></tr></table>',
 tip:'سؤال مضمون: عرّف الـ 5 criteria. ولاحظ: response time = أول response مش آخر output.'},
{t:'Priorities',ta:'الأولويات: static / dynamic',i:'🏅',
 an:'في المطار: ممكن تاخد أولوية لأنك <b>earned</b> (درجة ذهبية بكتر السفر) أو <b>bought</b> (اشتريت تذكرة first class). والأولوية ممكن تبقى ثابتة طول الرحلة (static) أو تتغير لو حصل ظرف (dynamic).',
 th:['Priorities may be assigned <b>automatically by the system</b> or <b>externally</b>.','May be <b>earned</b> or may be <b>bought</b>.','May be <b>static</b> or <b>dynamic</b>.','<b>Static priorities</b> can’t be changed – <b>easy to implement</b> – <b>no response to external changes</b>.','<b>Dynamic priorities</b> can be changed even after a short duration – <b>complex implementation</b> – <b>responsive to external changes</b>.'],
 ar:['الـ static سهل في التنفيذ لكن مش بيتجاوب مع التغييرات. الـ dynamic معقّد لكن مرن.'],
 ex:'<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Can change?</td><td>No</td><td>Yes (even after a short duration)</td></tr><tr><td>Implementation</td><td>Easy</td><td>Complex</td></tr><tr><td>External changes</td><td>No response</td><td>Responsive</td></tr></table>',
 tip:'3 تقسيمات: automatic/external · earned/bought · static/dynamic.'},
{t:'Scheduling Algorithms & Deadline Scheduling',ta:'الخوارزميات الـ 8 + الـ Deadline',i:'📅',
 an:'الـ 8 خوارزميات زي <b>8 طرق مختلفة لتنظيم طابور</b>: بالدور، بالوقت، بالأقصر، بالأهم، بمستويات، لأكتر من كاشير، وللحاجات اللي عليها deadline.',
 th:['Scheduling algorithms in the lecture: <b>Deadline Scheduling</b> · <b>First-Come, First-Served (FCFS)</b> · <b>Round Robin (RR)</b> · <b>Shortest-Job-First (SJF)</b> (written SJR on the slide) · <b>Priority Scheduling</b> · <b>Multilevel Feedback Queue</b> · <b>Multiple-Processor Scheduling</b> · <b>Real-Time Scheduling</b>.','<b>Deadline scheduling</b>: jobs are scheduled to be completed by a specific time or deadline. Delivered on time: <b>very high priority</b>. Delivered after the deadline: <b>worthless</b>.','Deadline scheduling is <b>very complex</b>:','(1) the user must supply the <b>precise resource requirements in advance</b> – such information is rare;','(2) the system must run the deadline job <b>without severely degrading service to other users</b>;','(3) the system must <b>plan its resource requirements through to the deadline</b>;','(4) many deadline jobs active at once make scheduling very complex;','(5) it needs <b>intensive resource management</b>.'],
 ar:['الـ deadline job قيمته بتروح بالكامل لو اتأخر.'],
 ex:'',tip:'احفظ الـ 8 أسماء بالترتيب + الـ 5 أسباب اللي بتخلي الـ deadline scheduling معقّد.'},
{t:'First-Come, First-Served (FCFS) [FIFO]',ta:'اللي يوصل الأول يتخدم الأول',i:'🥇',
 an:'<b>طابور الفرن</b>: اللي جه الأول ياخد الأول. عادل بالشكل لكن لو قدامك واحد واخد 50 رغيف هتستنى كتير وانت واخد رغيف واحد!',
 th:['Processes are dispatched according to their <b>arrival time</b>.','<b>Fair in formal sense, unfair</b> for making short jobs wait for long jobs.','It is a <b>nonpreemptive</b> discipline.','Rarely used as a master scheme, but may be used in cooperation with another scheme.','Example: <b>(P1,24), (P2,3), (P3,3)</b> arriving in the order P1, P2, P3 → Waiting: P1 = 0; P2 = 24; P3 = 27 → <b>Average waiting time = (0+24+27)/3 = 17</b>.','If the order is <b>P2, P3, P1</b> → Waiting: P1 = 6; P2 = 0; P3 = 3 → <b>Average waiting time = (6+0+3)/3 = 3</b> – much better than the previous case.','<b>FCFS can’t guarantee good response time.</b>'],
 ar:['نفس الـ processes بس بترتيب مختلف → متوسط الانتظار من 17 لـ 3!'],
 ex:'<b>Order P1, P2, P3:</b>'+ganttHTML([['P1',0,24],['P2',24,27],['P3',27,30]])+'<div dir="ltr">Waiting: P1=0 · P2=24 · P3=27 → <b>avg = 17</b></div><br><b>Order P2, P3, P1:</b>'+ganttHTML([['P2',0,3],['P3',3,6],['P1',6,30]])+'<div dir="ltr">Waiting: P1=6 · P2=0 · P3=3 → <b>avg = 3</b></div>',
 tip:'سؤال متكرر: ارسم الـ Gantt chart واحسب الـ average waiting time للترتيبين (17 و 3).'},
{t:'Round Robin (RR) Scheduling',ta:'كل واحد ياخد دور صغير (quantum)',i:'🔄',
 an:'<b>لعبة دور على الـ PlayStation</b>: كل لاعب ياخد 5 دقايق وبعدين الجهاز يروح للي بعده، ولو لسه مخلّصتش تقف في آخر الطابور وتستنى دورك تاني.',
 th:['Each process gets a small unit of CPU time called <b>time-slice or quantum</b>, usually <b>10–100 milliseconds</b>.','If this time has expired before the process finishes, the process is <b>preempted and added to the end of the ready queue</b>, while the CPU is given to the next ready process.','If there are <b>n</b> processes in the ready queue and the time quantum is <b>q</b>, each process gets <b>1/n</b> of the CPU time in chunks of at most q time units at once. <b>No process waits more than (n−1)q time units.</b>','Performance: <b>q large → FIFO</b>; <b>q small</b> → q must be large with respect to context switch, otherwise overhead is too high.','Effective in <b>time-sharing</b> environments; guarantees <b>reasonable response time</b>; the preemption overhead is kept low.','<b>Smaller time quantum increases context switches</b>, which increases overhead. (Figure: process time = 10 → quantum 12: 0 context switches; quantum 6: 1; quantum 1: 9.)','Example: RR with <b>quantum = 20</b>, (P1,53), (P2,17), (P3,68), (P4,24).'],
 ar:['الـ quantum الكبير بيخلّي الـ RR يتصرف زي FIFO. والصغير بيزوّد الـ context switches.'],
 ex:'<b>Gantt chart (q = 20):</b>'+ganttHTML([['P1',0,20],['P2',20,37],['P3',37,57],['P4',57,77],['P1',77,97],['P3',97,117],['P4',117,121],['P1',121,134],['P3',134,154],['P3',154,162]])+'<div dir="ltr">Computed from the Gantt: waiting P1=81 · P2=20 · P3=94 · P4=97 → avg = 73 (this average is not on the slide).</div>',
 tip:'الصيغة: no process waits more than (n−1)q. و q large → FIFO، q small → overhead عالي.'},
{t:'Shortest-Job-First (SJF) & SRTF',ta:'الأقصر الأول — وبنسخة preemptive',i:'⚡',
 an:'<b>كاشير سوبر ماركت</b> بيقول: اللي معاه حاجة واحدة يعدّي الأول. كده متوسط الانتظار بيقل جداً — لكن اللي معاه عربية كاملة ممكن يستنى كتير.',
 th:['The waiting process with the <b>smallest estimated run-time-to-completion</b> is run next.','Two schemes: <b>Nonpreemptive</b> – once the CPU is given to the process it cannot be preempted until it completes its CPU burst. <b>Preemptive</b> – if a new process arrives with CPU burst length less than the remaining time of the current process, preempt. This scheme is known as <b>Shortest-Remaining-Time-First (SRTF)</b>.','SJF is <b>optimal</b> – gives the <b>minimum average waiting time</b> for a given set of processes.','<b>Lower average turnaround than RR, but longer response</b>.','Example data: P1 (arrival 0.0, burst 7) · P2 (2.0, 4) · P3 (4.0, 1) · P4 (5.0, 4).','<b>Non-preemptive SJF</b>: average waiting time = (0+6+3+7)/4 = <b>4</b>.','<b>Preemptive SJF (SRTF)</b>: average waiting time = (9+1+0+2)/4 = <b>3</b>.'],
 ar:['SJF هو الأمثل (optimal) من ناحية متوسط الانتظار.'],
 ex:'<b>Non-preemptive SJF:</b>'+ganttHTML([['P1',0,7],['P3',7,8],['P2',8,12],['P4',12,16]])+'<div dir="ltr">Waiting: P1=0 · P2=6 · P3=3 · P4=7 → <b>avg = 4</b></div><br><b>Preemptive SJF (SRTF):</b>'+ganttHTML([['P1',0,2],['P2',2,4],['P3',4,5],['P2',5,7],['P4',7,11],['P1',11,16]])+'<div dir="ltr">Waiting: P1=9 · P2=1 · P3=0 · P4=2 → <b>avg = 3</b></div>',
 tip:'متنساش: SJF optimal، والـ preemptive اسمه SRTF. والأرقام 4 و 3.'},
{t:'Priority Scheduling',ta:'الأهم الأول — و problem الـ starvation',i:'🎖️',
 an:'<b>طوارئ المستشفى</b>: الحالة الخطيرة تتكشف الأول. لكن لو الحالات الخطيرة ماخلصتش طول اليوم، صاحب الحالة البسيطة ممكن يفضل مستني للأبد (<b>starvation</b>). الحل: كل ما يستنى أكتر نزوّد أولويته (<b>aging</b>).',
 th:['A <b>priority number (integer)</b> is associated with each process.','The CPU is allocated to the process with the <b>highest priority</b> (<b>smallest integer ≡ highest priority</b>); it can be <b>preemptive</b> or <b>nonpreemptive</b>.','<b>SJF is a priority scheduling</b> where the priority is the predicted next CPU burst time.','Problem ≡ <b>Starvation</b> – low-priority processes may never execute.','Solution ≡ <b>Aging</b> – as time progresses, increase the priority of the process.'],
 ar:['الرقم الأصغر = أولوية أعلى. SJF حالة خاصة من الـ priority.'],
 ex:'',tip:'Smallest integer = highest priority. Problem = Starvation، Solution = Aging. و SJF = priority scheduling.'},
{t:'Multilevel Queue',ta:'الطابور مقسّم لعدة طوابير',i:'🏢',
 an:'<b>مطار</b> فيه كاونترات: first class، business، economy. كل كاونتر له نظامه (ده الـ algorithm بتاعه)، والمطار لازم يقرر مين ياخد الأولوية بين الكاونترات.',
 th:['The ready queue is <b>partitioned into separate queues</b>: <b>foreground (interactive)</b> and <b>background (batch)</b>.','Each queue has <b>its own scheduling algorithm</b>: foreground – <b>RR</b>; background – <b>FCFS</b>.','Scheduling must be done <b>between the queues</b>:','<b>Fixed priority scheduling</b> – serve all from foreground, then from background. Possibility of <b>starvation</b>.','<b>Time slice</b> – each queue gets a certain amount of CPU time which it can schedule amongst its processes; e.g., <b>80% to foreground in RR</b> and <b>20% to background in FCFS</b>.','Figure (highest → lowest priority): system processes · interactive processes · interactive editing processes · batch processes · student processes.'],
 ar:['كل queue ليها algorithm، وبين الـ queues فيه fixed priority أو time slice.'],
 ex:'',tip:'foreground = RR · background = FCFS · بين الـ queues: fixed priority (starvation) أو time slice (80/20).'},
{t:'Multilevel Feedback Queue',ta:'الـ process بتتنقل بين الـ queues',i:'🛗',
 an:'<b>أسانسير بيطلع للأدوار</b>: كل ما الـ process تاخد وقت كتير وماتخلّصش تتنقل لدور أبطأ. الشغلانات القصيرة بتخلص في الدور الأول بسرعة.',
 th:['A process <b>can move between the various queues</b>; <b>aging</b> can be implemented this way.','A multilevel-feedback-queue scheduler is defined by: <b>number of queues</b> · <b>scheduling algorithm for each queue</b> · method used to determine when to <b>upgrade</b> a process · method used to determine when to <b>demote</b> a process · method used to determine <b>which queue</b> a process will enter when it needs service.','Example – three queues: <b>Q0 – time quantum 8 ms</b> · <b>Q1 – time quantum 16 ms</b> · <b>Q2 – FCFS</b>.','A new job enters queue <b>Q0</b>. When it gains the CPU, it receives <b>8 ms</b>. If it does not finish in 8 ms, it is moved to queue <b>Q1</b>.','At Q1 the job is served again and receives <b>16 additional ms</b>. If it still does not complete, it is <b>preempted and moved to queue Q2</b>.'],
 ar:['جرّب الـ simulator: غيّر الـ burst وشوف الـ job بتنزل لأنهي queue.'],
 ex:'',tip:'الأرقام: Q0 = 8ms · Q1 = 16ms · Q2 = FCFS. و5 parameters بتعرّف الـ MLFQ.',viz:'mlfq'},
{t:'Multiple-Processor Scheduling',ta:'لو عندك أكتر من CPU',i:'🧮',
 an:'<b>سوبر ماركت فيه أكتر من كاشير</b>: يا إما كل كاشير له طابور خاص بيه (self-scheduling)، يا إما فيه طابور واحد ومدير واحد بيوزّع على الكاشيرات (master-slave).',
 th:['CPU scheduling is <b>more complex</b> when multiple CPUs are available.','<b>Homogeneous system</b>: processes are identical in terms of their functionality. Can processes run on any processor?','<b>Heterogeneous system</b>: programs must be <b>compiled for instructions on proper processors</b>.','<b>Load sharing – Load balancing!</b>','A <b>queue for each processor</b> → <b>Self-Scheduling</b> – <b>Symmetric Multiprocessing</b>.','A <b>common ready queue</b> for all processors, accessed by one processor → <b>Master-Slave</b> – <b>Asymmetric Multiprocessing</b>; alleviating the need for data sharing.'],
 ar:['الربط: queue لكل processor = self-scheduling = symmetric. queue مشتركة = master-slave = asymmetric.'],
 ex:'<table><tr><th>Design</th><th>Also called</th></tr><tr><td>A queue for each processor</td><td>Self-Scheduling · Symmetric Multiprocessing</td></tr><tr><td>Common ready queue (accessed by one processor)</td><td>Master-Slave · Asymmetric Multiprocessing</td></tr></table>',
 tip:'سؤال جاهز: match بين الـ queue design وبين symmetric / asymmetric.'},
{t:'Real-Time Scheduling',ta:'Hard و Soft real-time',i:'⏱️',
 an:'<b>Hard</b> = الـ airbag في العربية: لازم يفتح في الميلي ثانية الصح. <b>Soft</b> = فيديو يوتيوب: لو اتأخر شوية مش كارثة بس الأفضل ياخد أولوية.',
 th:['<b>Hard real-time systems</b>: must know the <b>exact time for each task</b>; scheduling is either <b>pre-determined</b> or done by <b>resource reservation</b>.','<b>Resource reservation</b> – the task tries to reserve resources before starting. It is <b>rejected</b> if all resources are not available.','<b>Soft real-time systems</b>: real-time processes are given <b>priority over other processes</b>.','Processes must have <b>small dispatch latency</b>, usually implemented by <b>preemption</b>.'],
 ar:['Hard = وقت دقيق + resource reservation. Soft = أولوية + dispatch latency صغيرة بالـ preemption.'],
 ex:'<table><tr><th></th><th>Hard real-time</th><th>Soft real-time</th></tr><tr><td>Timing</td><td>Exact time for each task must be known</td><td>Priority over other processes</td></tr><tr><td>How</td><td>Pre-determined or resource reservation</td><td>Small dispatch latency via preemption</td></tr><tr><td>If resources missing</td><td>Task is rejected</td><td>—</td></tr></table>',
 tip:'Hard: resource reservation (يترفض لو الموارد مش متاحة). Soft: priority + small dispatch latency + preemption.'},
{t:'Try It: CPU Scheduling Simulator',ta:'جرّب بنفسك واحسب الـ waiting time',i:'🧪',
 an:'أحسن طريقة تفهم الـ scheduling إنك <b>تشوف الـ Gantt chart بيتبني</b> وتغيّر الأرقام بنفسك. الـ simulator تحت فيه أمثلة المحاضرة جاهزة.',
 th:['Presets reproduce the lecture examples: <b>FCFS</b> (24, 3, 3) → avg waiting 17 / 3 · <b>RR q=20</b> (53, 17, 68, 24) · <b>SJF non-preemptive</b> → avg 4 · <b>SRTF</b> → avg 3.','Waiting time = turnaround − burst; turnaround = finish − arrival.','You can also edit arrival, burst and priority (smallest number = highest priority) and test <b>Priority</b> scheduling.'],
 ar:['اختار preset، دوس Run، وقارن الأرقام بالمحاضرة.'],
 ex:'',tip:'حلّ المسائل بإيدك الأول، وبعدين اتأكد بالـ simulator.',viz:'cpusim'}
]}
};

/* ============ DETAILED ARABIC (AR_PLUS) ============ */
const AR_PLUS={
'1-0':{ar:[
"<b>ببساطة:</b> الجهاز (الـ hardware) لوحده مجرد حديد وشرايح مبتعرفش تعمل حاجة مفيدة. والبرامج (Chrome, Games, Word) كلها عايزة تستخدم نفس الأجهزة في نفس الوقت. هنا بيجي دور الـ <b>Operating System</b>.",
"الـ OS بيعمل 3 أدوار في نفس الوقت، وده بالظبط اللي في التعريف:",
"<b>1) Controls the hardware</b> — هو اللي بيتحكم في الـ processors والـ storage والـ I/O devices وأجهزة الاتصال والبيانات.",
"<b>2) Manages the hardware</b> — بيراقبها وبيحافظ إنها شغالة صح ومفيش حد بيستخدمها غلط.",
"<b>3) Resource allocator</b> — لما أكتر من برنامج يطلبوا نفس المورد (مثلاً الـ CPU) هو اللي بيقرر مين ياخد ولمدة قد إيه.",
"وفي تعريف تاني في الشرايح: الـ OS هو <b>program that controls the execution of application programs</b> — يعني برنامج بيتحكم في تشغيل البرامج التانية، وبيتحكم في توزيع واستخدام موارد الـ hardware، وبينسّق بين كل الـ software اللي جوه الكمبيوتر.",
"رسمة <b>Where can an OS fit?</b>: المستخدمين (User 1 … User n) بيستخدموا Editors / Games / Compilers / Database ← دول <b>System and Application Programs</b> ← تحتهم الـ <b>Operating System</b> ← تحتيه الـ <b>Hardware</b>. يعني الـ OS <b>واقف في النص</b> بين البرامج والـ hardware."],
why:"من غير OS كل مبرمج كان لازم يكتب كود يتعامل مع الـ disk والـ printer والـ memory بنفسه، وكل برنامجين كانوا هيتخانقوا على الـ CPU. الـ OS بيحل المشكلة دي مرة واحدة للكل.",
mis:"متفتكرش إن الـ OS هو Windows بس. Windows / Linux / Android أمثلة، لكن <b>OS</b> هو المفهوم: software بيدير الـ hardware ويوزع الموارد. وكمان Word أو Chrome دول <b>application programs</b> مش OS.",
mem:"مدير المطعم = OS · الزباين = Programs · المطبخ = Hardware. وكلمات التعريف التلاتة: <b>Controls – Manages – Allocator</b>."},

'1-1':{ar:[
"الأهداف الـ 8 دول بيجاوبوا على سؤال واحد: <b>ليه بنستخدم OS أصلاً؟</b>",
"<b>1) Convenience (الراحة):</b> تفتح ملف بضغطتين بدل ما تكتب أوامر معقدة تتعامل بيها مع الـ disk.",
"<b>2) Ease of Communication:</b> تواصل سهل بين الكمبيوتر واليوزر عن طريق <b>friendly user interface</b>، وكمان بين مكونات النظام نفسها (among system components).",
"<b>3) Abstraction:</b> الـ OS بيخبّي التفاصيل المعقدة. بتكتب برنامج بيحفظ ملف من غير ما تعرف الـ disk عندك SSD ولا HDD — ده اسمه <b>hardware-independent programming model</b>.",
"<b>4) Efficiency:</b> الموارد (CPU, memory, I/O) تتستخدم بكفاءة ومفيش حاجة واقفة من غير شغل.",
"<b>5) Monitoring and Alerting:</b> بيراقب الأعطال والمشاكل وينبّهك (زي رسالة Disk almost full).",
"<b>6) Ability to Evolve:</b> تقدر تطوّر وتختبر وتضيف وظايف جديدة للـ OS (زي الـ updates) <b>من غير ما الخدمات الحالية تقف أو تتأثر</b>.",
"<b>7) Protection:</b> طبقة أمان بتحمي بيانات المستخدم وبتمنع برنامج يدخل على بيانات برنامج تاني.",
"<b>8) Increasing performance:</b> زيادة الـ <b>throughput</b> (كمية الشغل اللي بيخلص في وقت معين) وتقليل الوقت اللي بيستغرقه تنفيذ الأمر."],
why:"الأهداف دي هي معيار الحكم على أي OS: لو الـ OS سهل ومحمي وسريع ويتطور، يبقى حقق أهدافه.",
mis:"Convenience و Efficiency ساعات بيتعارضوا (الواجهة الشيك بتاكل موارد). اتحفظ إن الاتنين أهداف رسمية وكل واحد له معنى مختلف. وكمان <b>Throughput</b> مش هي <b>response time</b> — throughput = كمية الشغل، response = سرعة الرد.",
mem:"ركّب جملة بأول الحروف: C-E-A-E-M-A-P-I. أو اتخيل فندق: ضيوف مرتاحين (Convenience) · استقبال لطيف (Communication) · غرف جاهزة (Abstraction) · إدارة ذكية (Efficiency) · كاميرات (Monitoring) · تجديد من غير غلق (Evolve) · أمن (Protection) · خدمة سريعة (Performance)."},

'1-2':{ar:[
"الخدمات دي هي <b>اللي الـ OS بيقدّمه ليك كمستخدم أو كمبرمج</b>. اعتبرها قايمة خدمات:",
"<b>1) Program development:</b> أدوات تساعدك تكتب البرامج — <b>editors</b> (تكتب فيها الكود) و <b>debuggers</b> (تدوّر بيها على الأخطاء).",
"<b>2) Program execution:</b> لما تدوس Run، الـ OS بيعمل <b>load</b> للبرنامج والبيانات في الـ memory ويجهّز البيئة (initialize environment) ويبدأ التنفيذ.",
"<b>3) Access to I/O devices:</b> البرنامج مش بيكلّم الطابعة مباشرة؛ الـ OS هو اللي بيقرا ويكتب على الـ ports والـ units.",
"<b>4) Controlled access to data:</b> حماية الوصول — مين يقرا إيه ومين يكتب إيه (access protection).",
"<b>5) System access:</b> مين أصلاً يدخل على الجهاز؟ ده الـ <b>user authentication</b> (الـ login).",
"<b>6) Error detection and response:</b> لو حصل خطأ يعرض رسالة Error. والأخطاء نوعين: (أ) <b>Internal/external hardware errors</b>: Memory error، Device failure. (ب) <b>Software errors</b>: Arithmetic overflow، أو محاولة الوصول لمكان ممنوع في الـ memory.",
"<b>7) Accounting:</b> بيجمع <b>statistics</b> وبيراقب الأداء. بيتستخدم في حاجتين: توقّع التحسينات المستقبلية، وعمل فواتير للمستخدمين (billing)."],
why:"الخدمات دي بتخلي المبرمج والمستخدم يركّزوا في شغلهم من غير ما يقلقوا من تفاصيل الجهاز.",
mis:"متلخبطش بين <b>Controlled access to data</b> (حماية الملفات والبيانات) و <b>System access</b> (الدخول للجهاز نفسه = login). الأولى بيانات، التانية دخول.",
mem:"الخدمات 7: <b>P-P-I-C-S-E-A</b> = Program dev · Program exec · I/O · Controlled data · System access · Errors · Accounting."},

'1-3':{ar:[
"تخيل شبكة كلية فيها 100 طالب وكل واحد بيستخدم جهاز. الـ OS في الحالة دي مسؤول عن 6 حاجات:",
"<b>1) Sharing H/W among users:</b> الطابعة والـ disk والـ scanner يتشاركوا بين الناس.",
"<b>2) Allowing users to share data:</b> تبعت ملف لزميلك أو تفتح فولدر مشترك.",
"<b>3) Preventing users from interfering with one another:</b> شغلك ميبوّظش شغل زميلك ولا يشوف ملفاتك لو مش مسموح.",
"<b>4) Scheduling resources among users:</b> لو 10 طلبوا الطابعة، الـ OS بيرتّب الدور.",
"<b>5) Organizing data for secure and rapid access:</b> بينظّم الملفات بحيث توصل لها بسرعة وبأمان.",
"<b>6) Handling network communications:</b> بيدير الاتصال بين الأجهزة."],
why:"الشبكة معناها مستخدمين كتير ومشاركة موارد؛ من غير OS يتحكم في ده الدنيا هتبقى فوضى.",
mis:"السؤال ممكن يبقى 'اذكر 4 وظايف'. متنساش إن في وظيفتين شبه بعض: sharing H/W (أجهزة) و sharing data (بيانات).",
mem:"الكلمات المفتاحية: <b>Share · Share · Prevent · Schedule · Organize · Handle</b>."},

'1-4':{ar:[
"الجهاز مش OS بس! في مكونات كاملة:",
"<b>Hardware:</b> Input devices (كيبورد/ماوس) · Processing devices (<b>CPU</b>) · Output devices (شاشة/طابعة) · Storage devices (disk).",
"<b>Software نوعين:</b> (أ) <b>Applications software</b> زي Word Processing وSpreadsheet وDatabase. (ب) <b>System software</b> زي الـ Operating System والـ Utilities.",
"<b>الناس:</b> <b>Users (end users)</b> هم اللي محتاجين الـ output، و<b>Programmers</b> هم اللي بيكتبوا البرامج اللي بتدّي الـ output ده.",
"<b>رسمة Layers of Computer System (من فوق لتحت):</b> End User ← Application Programs ← Utilities ← Operating Systems ← Computer Hardware.",
"والأسهم اللي في الرسمة بتقول مين بيتعامل مع إيه: الـ <b>End User</b> مع الـ Application Programs · الـ <b>Programmer</b> مع الـ Utilities والـ Operating System · الـ <b>OS Designer</b> مع الـ Computer Hardware.",
"دوس على كل طبقة في الرسمة اللي تحت عشان تشوف شرحها 👇"],
why:"فهم الطبقات بيوضح إن الـ OS هو الوسيط، وإن كل شخص بيتعامل مع مستوى مختلف.",
mis:"بعض الطلبة بيحطوا الـ Utilities فوق الـ Application. الترتيب الصح: الـ Application فوق الـ Utilities فوق الـ OS فوق الـ Hardware.",
mem:"<b>E-A-U-O-H</b>: End user, Applications, Utilities, OS, Hardware (من فوق لتحت). والشخص بجانب كل طبقة: End User→App، Programmer→Utilities/OS، Designer→HW."},

'1-5':{ar:[
"<b>الفكرة الأساسية:</b> الـ CPU وأجهزة الـ I/O يقدروا يشتغلوا <b>في نفس الوقت (concurrently)</b> — مش لازم الـ CPU يقف يستنى الجهاز.",
"<b>Device controller:</b> زي مدير صغير مسؤول عن <b>نوع واحد</b> من الأجهزة (Disk controller للـ disks، Printer controller للطابعة، Tape controller للـ tapes).",
"كل controller عنده <b>local buffer</b> (ذاكرة صغيرة خاصة بيه) بيخزّن فيها الداتا مؤقتاً.",
"<b>مين بينقل الداتا إزاي؟</b> (أ) الـ <b>CPU</b> بينقل الداتا من/إلى الـ main memory إلى/من الـ local buffers. (ب) الـ <b>I/O</b> نفسه بيحصل من الجهاز إلى الـ local buffer بتاع الـ controller.",
"كل ده بيتوصل بـ <b>system bus</b> (في الرسمة: CPU وDisk controller وPrinter controller وTape controller وMemory controller كلهم على نفس الـ bus)."],
why:"لولا الـ concurrency، الـ CPU كان هيفضل واقف مستني الطابعة أو الـ disk، ودي أبطأ بكتير من الـ CPU.",
mis:"اتفرق بين <b>الـ CPU بينقل بين memory وbuffer</b> و<b>الـ I/O بين الجهاز وbuffer</b>. مفيش حد منهم بيكلّم الجهاز مباشرة من الـ memory (إلا في الـ DMA وده في L2).",
mem:"controller لكل نوع جهاز + <b>local buffer</b> (درج صغير) + <b>system bus</b> (الطريق)."},

'1-6':{ar:[
"الـ storage مش نوع واحد؛ الأنواع بتتنظم في <b>هرم (hierarchy)</b> على 3 معايير: <b>Speed · Cost · Volatility</b>.",
"ترتيب الهرم من فوق لتحت: <b>Registers → Cache → Main memory → Electronic disk → Magnetic disk → Optical disk → Magnetic tapes</b>.",
"<b>كل ما تطلع لفوق:</b> أسرع، أغلى (للبايت)، أصغر في السعة، و<b>volatile</b> (يعني البيانات بتضيع لما الكهربا تقطع).",
"<b>كل ما تنزل لتحت:</b> أبطأ، أرخص، أكبر في السعة، و<b>non-volatile</b> (البيانات بتفضل).",
"ليه نعمل كده؟ لأن الأسرع غالي جداً. فبنحط الشغل الحالي في الأسرع، والباقي في الأرخص."],
why:"الـ hierarchy هي حل وسط عملي بين السرعة والتكلفة والسعة.",
mis:"مش كل اللي فوق volatile بشكل مطلق في الأمثلة، لكن القاعدة العامة في المحاضرة: فوق = volatile وتحت = non-volatile. وبرضه متقولش إن الـ tape أسرع من الـ disk — هو الأبطأ.",
mem:"R-C-M-E-M-O-M: Registers, Cache, Main memory, Electronic disk, Magnetic disk, Optical disk, Magnetic tapes. اتخيل هرم: <b>فوق = سريع/غالي/بيضيع</b>، <b>تحت = بطيء/رخيص/بيفضل</b>."},

'1-7':{ar:[
"الـ <b>Kernel</b> هو قلب الـ OS — الجزء اللي دايماً شغّال في الـ memory وبيتحكم في الأساسيات.",
"في المحاضرة، الـ kernel مسؤول عن الحاجات دي:",
"<b>Memory allocation:</b> بيحجز مساحة في الـ memory للي يطلبها.",
"<b>Garbage collection:</b> بينضّف المساحات اللي مبقاش حد بيستخدمها.",
"<b>Object finalization:</b> بينهي ويقفل الـ objects اللي خلص منها.",
"<b>Module termination:</b> إنهاء الـ module.",
"<b>Interfacing to the underlying OS and clock functions:</b> التعامل مع الـ OS اللي تحته ووظايف الساعة (clock).",
"في الرسمة: دايرة في النص = <b>Kernel</b> · حلقة حواليه = <b>Services</b> · حلقة برة = <b>User Processes</b>. يعني اليوزر بيطلب خدمات والـ kernel بيلبّيها."],
why:"فصل الـ kernel عن الـ user processes بيحمي الجزء الحساس من العبث.",
mis:"النقط دي مأخوذة من شريحة المحاضرة بالظبط، فاحفظها كما هي. ومتتلخبطش بين الـ kernel والـ shell: الـ shell بيستقبل الأوامر، والـ kernel بينفّذ الأساسيات.",
mem:"5 نقط: <b>Memory – Garbage – Finalization – Termination – Interfacing/Clock</b>."},

'1-8':{ar:[
"الشرائح بتقسم الأنظمة لـ 8 أنواع. اتذكر النوع بالـ <b>سبب وجوده</b>:",
"<b>Simple Batch:</b> بيشغّل <b>job واحد</b> بس في الوقت، والـ jobs بتتجمع في <b>batches</b> وبتتنفذ واحدة ورا التانية. الهدف: انتقال سلس بين الـ jobs لأقصى استفادة.",
"<b>Multi-programmed Batch:</b> بيخزّن <b>أكتر من برنامج في الـ memory</b>، لأن أي job نادراً ما بيستخدم كل الموارد. فلما واحد يستنى I/O، التاني ياخد الـ CPU.",
"<b>Time-Sharing:</b> بيبدّل بين الـ jobs بسرعة، فيدّي كل يوزر إحساس إنه لوحده. <b>Interactive</b> وبـ <b>low response time</b>. والبرنامج لازم يكون في الـ memory عشان ياخد دوره.",
"<b>Personal (Desktop):</b> كل يوزر له memory وprocessor وI/O خاصين بيه. بقى ممكن بعد اختراع الـ microprocessors. والداتا بتتشارك بالـ networks.",
"<b>Parallel:</b> أكتر من CPU بيتشاركوا <b>common bus</b>. لازم الـ job يتقسم لأجزاء صغيرة <b>مستقلة</b>. وزيادة السرعة بشكل أُسّي محتاجة زيادة أُسّية في عدد الـ processors.",
"<b>Distributed:</b> أجهزة مستقلة متصلة بشبكة (WAN/LAN) وبتشتغل كأنها نظام واحد. فيه <b>Client-Server</b> و<b>Peer-to-Peer</b>، ويتميز بالـ <b>incremental growth</b>.",
"<b>Real-Time:</b> بيتحكم في تطبيقات مخصصة (تجارب علمية، medical imaging، industrial control) بـ <b>fixed-time constraints</b>. <b>Hard</b>: الـ deadline مقدّس. <b>Soft</b>: مفيد في الـ multimedia والـ virtual reality.",
"<b>Handheld:</b> PDAs وموبايلات، ومشاكلها: <b>limited memory</b> و<b>slow processors</b> و<b>small display screens</b>.",
"دوس على كل كارت تحت عشان تشوف الـ analogy والنقط 👇"],
why:"كل نوع اتصنع عشان يحل مشكلة معينة في اللي قبله (batch ← multiprogramming ← time-sharing ... إلخ).",
mis:"متقولش إن الـ batch بيشغّل أكتر من job في نفس الوقت (ده multiprogramming). وكمان Distributed ≠ Parallel: Parallel = CPUs على نفس الـ bus، Distributed = أجهزة مستقلة على شبكة.",
mem:"بالكلمة المفتاحية: Batch=<b>one job</b> · Multi=<b>more in memory</b> · Time-sharing=<b>response time</b> · Personal=<b>own resources</b> · Parallel=<b>2+ CPUs, one bus</b> · Distributed=<b>network</b> · Real-time=<b>deadlines</b> · Handheld=<b>limited</b>."},

'1-9':{ar:[
"الكمبيوترات بتتقسم 5 فئات بحسب الحجم والقوة، وكل ما الجهاز أكبر كل ما <b>processing power</b> أكبر:",
"<b>Mobile devices:</b> أجهزة صغيرة جداً مبنية على موبايل أو pager لاسلكي، بتوفر <b>limited Internet access</b> بجانب وظايفها العادية (مكالمات ورسايل).",
"<b>Microcomputers (PCs):</b> ظهرت لما قدروا يعملوا <b>CPU كامل على chip واحدة</b> (microprocessor) رخيصة. منها Desktop وPortable (notebook, tablet, handheld, pocket). ومنصتين رئيسيتين: <b>PC compatible</b> (Intel) و<b>Macintosh</b> (Apple).",
"<b>Midrange (minicomputers):</b> بين الـ micro والـ mainframe في القوة؛ بتناسب شركة صغيرة أو متوسطة الـ microcomputer عندها صغير أو بطيء.",
"<b>Mainframes:</b> عمود الشركات الكبيرة، متخصصة في <b>high-volume processing of business transactions</b>، وبتشتغل 24 ساعة وبتخدم عشرات المستخدمين بالنهار وبتعمل الـ payroll والـ billing بالليل.",
"<b>Supercomputers:</b> للمعامل العلمية، <b>very fast speeds</b> و<b>extreme degrees of accuracy</b>، وكتير منها بتتعمل بربط <b>multiple PCs or microprocessor chips</b>.",
"والربط اللي لازم تحفظه: Mobile ← Handheld · Micro ← Desktop · Midrange ← Desktop & Real-time · Mainframe ← Batch & Time-share (Hybrid) · Super ← Parallel & Distributed."],
why:"بيربط بين الجانب العملي (الأجهزة اللي تعرفها) والجانب النظري (أنواع الـ OS).",
mis:"الـ Midrange بيتربط بـ <b>اتنين</b> (Desktop & Real-time)، والـ Mainframe بـ <b>Hybrid</b> (Batch & Time-share)، والـ Super بـ <b>اتنين</b> (Parallel & Distributed). فيه ناس بتنسى التاني.",
mem:"M-M-M-M-S: Mobile, Micro, Midrange, Mainframe, Super. وجاوب بجدول: Handheld / Desktop / Desktop+RT / Batch+TS / Parallel+Distributed."},

'2-0':{ar:[
"الـ OS مش حاجة واحدة؛ هو مجموعة <b>8 إدارات</b> كل واحدة مسؤولة عن جزء:",
"<b>1) Process Management</b> — الـ processes (البرامج الشغالة).",
"<b>2) Main Memory Management</b> — الـ RAM.",
"<b>3) Secondary-Storage Management</b> — الـ disks.",
"<b>4) I/O System Management</b> — أجهزة الإدخال والإخراج.",
"<b>5) File Management</b> — الملفات والفولدرات.",
"<b>6) Protection System</b> — الحماية والصلاحيات.",
"<b>7) Networking</b> — الاتصال بين الأجهزة.",
"<b>8) Command-Interpreter System</b> — الـ shell اللي بيستقبل أوامرك.",
"وفي الصفحات الجاية هنشرح كل واحدة بالتفصيل."],
why:"فهم التقسيم ده بيخلي أي سؤال 'الـ OS مسؤول عن إيه؟' إجابته جاهزة.",
mis:"الـ <b>Networking</b> و<b>Command-Interpreter</b> بيتنسوا في القايمة. العدد 8.",
mem:"<b>P-M-S-I-F-P-N-C</b> ← 'Pink Magic Stars In Fairy Palace Near Castle' 🌸."},

'2-1':{ar:[
"<b>أولاً — Process Management:</b> الـ process هو برنامج بيتنفّذ، ومحتاج موارد: CPU time وmemory وfiles وI/O devices. والـ OS مسؤول عن: <b>إنشاء وحذف</b> الـ processes (creation and deletion) · <b>إيقاف واستئناف</b> (suspension and resumption) · وبتوفّر <b>mechanisms</b> للـ <b>process synchronization</b> (التزامن) و<b>process communication</b> (الاتصال).",
"<b>تانياً — Main-Memory Management:</b> الـ memory عبارة عن array كبير من words أو bytes، وكل واحد له address. هي مخزن سريع بيشاركه الـ CPU والـ I/O. وهي <b>volatile</b>: بتفقد محتواها لو النظام وقع. والـ OS بيعمل: يتتبع <b>مين بيستخدم أنهي جزء</b> · يقرر <b>أنهي processes يتحمّلوا</b> لما المساحة تتوفر · <b>يحجز ويفكّ</b> المساحة حسب الحاجة (allocate/de-allocate).",
"<b>تالتاً — Secondary-Storage Management:</b> لأن الـ main memory volatile وصغيرة، لازم تخزين ثانوي (disks) يدعمها. والـ OS مسؤول عن: <b>Free space management</b> (المساحات الفاضية) · <b>Storage allocation</b> (توزيع المساحة) · <b>Disk scheduling</b> (ترتيب طلبات الـ disk)."],
why:"الـ memory والـ disk موارد محدودة، والـ OS هو اللي بيمنع التعارض ويستخدمهم بأحسن شكل.",
mis:"Process Management ≠ Memory Management. وفي الـ process الـ suspension/resumption مش هي نفس الـ creation/deletion. الـ disk scheduling تبع الـ Secondary storage مش الـ I/O.",
mem:"Process: <b>Create–Suspend–Sync/Comm</b> · Memory: <b>Track–Decide–Allocate</b> · Disk: <b>Free–Allocate–Schedule</b>."},

'2-2':{ar:[
"الـ I/O system مكوّن من 3 أجزاء: <b>1) Buffer-caching system</b> (بيحط داتا مؤقتاً في buffer/cache) · <b>2) General device-driver interface</b> (واجهة موحدة لكل الـ drivers) · <b>3) Drivers for specific hardware devices</b> (driver خاص بكل جهاز).",
"<b>طريقة الشغل (من الرسمة I/O System Operation):</b> الـ CPU والـ I/O devices يشتغلوا concurrently · كل controller مسؤول عن نوع جهاز · وله local buffer · الـ CPU بينقل داتا من/إلى الـ main memory إلى/من الـ local buffers · والـ I/O بيتم من الجهاز لـ local buffer الـ controller.",
"وإزاي الـ CPU يعرف إن الـ controller خلّص؟ الـ controller بيبعتله <b>interrupt</b>."],
why:"الـ drivers بتخلي الـ OS يشتغل مع أجهزة كتير مختلفة من غير ما يتغيّر.",
mis:"بعضهم بيقول إن الـ CPU بيسأل الجهاز كل شوية. الصح: الجهاز هو اللي بيبلّغ الـ CPU بـ interrupt.",
mem:"3 مكونات: <b>Buffer-cache + General interface + Specific drivers</b>."},

'2-3':{ar:[
"<b>الـ Interrupt</b> إشارة بتقطع شغل الـ CPU عشان حاجة مهمة حصلت (key press، I/O خلص، timer...).",
"<b>إيه اللي بيحصل (Example من المحاضرة):</b> الـ CPU شغال → اليوزر يضغط key (interrupt) → الـ OS <b>يحفظ الـ CPU state</b> → الـ CPU يروح لـ <b>ISR</b> → الـ ISR تخلص → الـ OS <b>يرجّع الـ CPU state</b> → البرنامج الأصلي يكمّل.",
"<b>Interrupt vector:</b> جدول فيه عناوين كل الـ service routines، والـ CPU بيروح للـ ISR الصح عن طريقه.",
"لازم تتحفظ <b>عنوان الـ instruction اللي اتقاطعت + حالة الـ CPU</b> عشان نرجع لنفس النقطة.",
"الـ interrupts الجاية بتتعطل (disabled) أثناء معالجة interrupt عشان منضيّعش interrupt (<b>lost interrupt</b>).",
"<b>Trap:</b> هو interrupt بيحصل من <b>software</b> بسبب error أو طلب من اليوزر. والـ OS <b>interrupt driven</b>.",
"<b>أنواع الـ interrupts (Classes):</b> <b>Program</b> (arithmetic overflow، division by zero، execute illegal instruction، reference outside user's memory space) · <b>Timer</b> · <b>I/O</b> · <b>Hardware failure</b>.",
"<b>Interrupt Handler:</b> برنامج بيحدد طبيعة الـ interrupt وبينفّذ الإجراءات المطلوبة، وبيتنقل له التحكم، وغالباً جزء من الـ OS.",
"<b>Interrupt Cycle:</b> بعد كل instruction، الـ processor بيشيّك لو في interrupt. لو مفيش → يجيب الـ instruction اللي بعدها. لو في → يوقف البرنامج الحالي وينفّذ الـ handler. جرّب الخطوات في الـ stepper 👇"],
why:"من غير interrupts الـ CPU هيفضل يسأل الأجهزة 'خلصتوا؟' طول الوقت ويضيّع وقته.",
mis:"الـ trap مش hardware! هو <b>software-generated</b>. وبرضه الـ Timer interrupt نوع منفصل (مهم في الـ time-sharing).",
mem:"Classes: <b>P-T-I-H</b> = Program, Timer, I/O, Hardware failure. وترتيب الخطوات: Save → ISR → Restore → Continue."},

'2-4':{ar:[
"لو جه interrupt تاني وإنت بتعالج واحد، عندك طريقتين:",
"<b>الطريقة الأولى — Sequential order (الترتيب):</b> بنعمل <b>disable</b> للـ interrupts أثناء معالجة واحد، والـ processor يتجاهل الطلبات الجديدة. الـ interrupts الجديدة بتفضل <b>pending</b> لحد ما الـ handler يخلص، وبعدين الـ processor يشيّك لو في interrupts إضافية.",
"<b>الطريقة التانية — Priorities (الأولويات):</b> الـ interrupts الأعلى أولوية بتخلّي الأقل أولوية <b>تستنى</b>، وممكن تقاطع handler واحد أقل أولوية (<b>nested</b>). مثال: لما يجي input من خط اتصال، لازم يتلقّط بسرعة عشان يفضّي مكان لباقي الـ input.",
"في الرسمة Figure 1.12: (a) Sequential interrupt processing — Handler X يخلص بعدين Handler Y. (b) Nested interrupt processing — لو Y أولوية أعلى، بيقاطع X ثم يرجع لـ X."],
why:"الـ priorities بتضمن إن الأحداث المستعجلة ماتستناش.",
mis:"الـ Sequential مش معناها إن الـ interrupt ضاع؛ هي <b>pending</b> وهتتنفذ بعدين. الضياع بيحصل لو الـ interrupt اتجاهل من غير ما يتسجل.",
mem:"(a) = طابور (واحد ورا التاني) · (b) = أولوية (VIP يقاطع)."},

'2-5':{ar:[
"<b>Starting I/O:</b> بنحمّل control information على الجهاز وبنسلّمه التحكم. وبعدين فيه نوعين:",
"<b>Synchronous:</b> بعد ما الـ I/O يبدأ، الـ control مبيرجعش للبرنامج <b>إلا لما الـ I/O يخلص</b>. يعني البرنامج بيقف يستنى (الـ requesting process بيكون waiting).",
"<b>Asynchronous:</b> بعد ما الـ I/O يبدأ، الـ control بيرجع للبرنامج <b>على طول من غير ما يستنى</b>. والـ process لازم يشيّك على حالة الجهاز (أو يتبلّغ) عشان يعرف إمتى الـ I/O خلص.",
"طلبات الـ I/O على جهاز مشغول لازم تتحط في <b>queue</b> لحد ما الجهاز يفضى.",
"<b>DMA — Direct Memory Access:</b> للأجهزة السريعة اللي بتنقل داتا بسرعة قريبة من سرعة الـ memory. الـ controller بينقل <b>blocks</b> من الـ buffer للـ main memory <b>من غير تدخل CPU</b>. والـ hardware اللي بيشغّل الـ I/O بـ DMA اسمه <b>DMA channel</b>.",
"في الرسمة Types of I/O: في الـ synchronous، الـ requesting process بتفضل waiting لحد ما الـ data transfer يخلص؛ وفي الـ asynchronous، الـ process بتكمّل شغل."],
why:"الـ async والـ DMA بيوفروا وقت الـ CPU، وده بيزوّد الـ performance.",
mis:"متخلطش: Synchronous = بتستنى. Asynchronous = متستناش. والـ DMA مش نوع تالت من الاتنين؛ هو أسلوب نقل بيقلّل تدخل الـ CPU.",
mem:"S = Stop & wait · A = Ahead (كمّل شغلك) · DMA = Delivery by controller."},

'2-6':{ar:[
"<b>File Management:</b> الـ file هو مجموعة معلومات مرتبطة يحددها مُنشئها. عادةً بيمثل برامج (source و object) أو بيانات. الـ OS مسؤول عن: <b>إنشاء وحذف الملفات</b> · <b>إنشاء وحذف الـ directories</b> · دعم primitives للتعامل مع الملفات والـ directories · <b>backup</b> للملفات على وسائط تخزين ثابتة (non-volatile).",
"<b>Protection System:</b> آلية للتحكم في وصول البرامج أو الـ processes أو المستخدمين لموارد النظام والمستخدم. لازم تعمل 3 حاجات: <b>تميّز</b> بين الاستخدام المصرّح والغير مصرّح · <b>تحدد الـ controls</b> المفروضة · <b>تضمن التنفيذ</b> (enforcement).",
"<b>Command-Interpreter System:</b> كتير من الأوامر بتتوجّه للـ OS عن طريق control statements في: process creation وI/O وsecondary-storage وmain-memory وfile-system access وprotection وnetworking. والبرنامج اللي بيقرا الأوامر دي اسمه: <b>control-card interpreter</b> أو <b>command-line interpreter</b> أو <b>shell</b> (في UNIX). وظيفته: يجيب الأمر الجاي وينفّذه."],
why:"التلات إدارات دي هي اللي اليوزر بيتعامل معاها مباشرة (ملفات، صلاحيات، أوامر).",
mis:"الـ Protection مش مجرد password؛ هي 3 مهام (distinguish – specify – enforce). والـ shell مش الـ kernel.",
mem:"File = create/delete + dirs + backup · Protection = Distinguish/Specify/Enforce · Shell = Get & execute next command."},

'2-7':{ar:[
"الـ <b>System call</b> هي الواجهة بين البرنامج الشغال والـ OS. البرنامج مش بيدخل الـ OS بنفسه؛ هو <b>بيطلب خدمة</b> والـ OS ينفّذها.",
"غالباً بتتوفر كـ <b>assembly-language instructions</b>، ولغات زي <b>C</b> بتسمح بعمل system calls مباشرة.",
"<b>3 طرق لتمرير الـ parameters:</b>",
"<b>1) Registers:</b> نحط الـ parameters في registers (أسرع طريقة لو الـ parameters قليلة).",
"<b>2) Table in memory:</b> نخزن الـ parameters في جدول في الـ memory ونمرّر عنوان الجدول (للـ parameters الكتيرة).",
"<b>3) Stack:</b> البرنامج بيعمل <b>push</b> للـ parameters على الـ stack والـ OS بيعمل <b>pop</b>.",
"تشبيه: الـ system call زي شباك التذاكر؛ والـ parameters هي بياناتك (إيدك لإيده = registers، ورقة فيها العنوان = table، أو تحطها في طبق = stack)."],
why:"من غير system calls البرامج هتتعامل مع الـ hardware مباشرة وده خطر.",
mis:"الطرق 3 بس: registers/table/stack — مفيش 'disk' ولا 'network'.",
mem:"<b>R-T-S</b> = Registers, Table, Stack."},

'2-8':{ar:[
"الـ <b>System programs</b> هي أدوات بتوفّر بيئة مريحة لتطوير البرامج وتشغيلها. بتتقسم لـ 7 فئات:",
"<b>File manipulation</b> (create, delete, copy, rename...) · <b>Status information</b> (date, time, free memory...) · <b>File modification</b> (text editors) · <b>Programming language support</b> (compilers, assemblers, interpreters) · <b>Program loading and execution</b> (loaders, debuggers) · <b>Communications</b> (email, remote login) · <b>Application programs</b>.",
"<b>نقطة مهمة جداً:</b> أغلب المستخدمين بيشوفوا الـ OS من خلال <b>system programs</b> مش من خلال الـ system calls الفعلية."],
why:"الـ system programs هي وش الـ OS اللي المستخدم بيتعامل معاه.",
mis:"System programs ≠ System calls. الأولى برامج مساعدة، التانية واجهة طلب الخدمة.",
mem:"7 فئات: File manip · Status · File mod · Language support · Loading · Communications · Applications."},

'2-9':{ar:[
"<b>1) MS-DOS (Simple approach):</b> اتكتب عشان يوفر <b>أكبر functionality في أقل مساحة</b>. <b>مش مقسّم لـ modules</b>، وده معناه إن الواجهات ومستويات الـ functionality <b>مش مفصولة كويس</b>. بيشغّل <b>process واحدة في الوقت</b>. (الرسمة: application program ← resident system program ← MS-DOS device drivers ← ROM BIOS device drivers، والـ application ممكن يتخطى الطبقات ويكلّم الـ hardware مباشرة.)",
"<b>2) UNIX:</b> محدود بإمكانيات الـ hardware، فالـ UNIX الأصلي كان فيه structuring محدود. بيتكون من جزئين: <b>System programs</b> و<b>Kernel</b> — والـ kernel هو كل حاجة تحت الـ system-call interface وفوق الـ hardware، وبيوفّر file system وCPU scheduling وmemory management وغيرها: <b>عدد كبير من الوظايف في مستوى واحد</b>.",
"<b>3) Layered Approach:</b> الـ OS مقسّم لـ layers، <b>layer 0</b> = hardware و<b>layer N</b> = user interface. كل layer بتستخدم services الـ layers <b>اللي تحتها بس</b> (modularity).",
"<b>أول layered OS (6 layers):</b> layer 5: user programs · layer 4: buffering for input and output · layer 3: operator-console device driver · layer 2: memory management · layer 1: CPU scheduling · layer 0: hardware.",
"دوس على الطبقات في الرسمة 👇"],
why:"التقسيم لـ layers بيسهّل الـ debugging والتطوير؛ لأن كل layer تتفحص لوحدها.",
mis:"الـ MS-DOS مش layered بشكل صارم. وبرضه الـ UNIX kernel كبير ومفيهوش تقسيم دقيق. الـ layered بيعتمد على اللي تحته بس مش اللي فوقه.",
mem:"من فوق لتحت: <b>5 User → 4 Buffering → 3 Console driver → 2 Memory → 1 CPU scheduling → 0 Hardware</b>."},

'2-10':{ar:[
"<b>الـ Virtual Machine</b> بياخد فكرة الـ layers لآخرها: بيعتبر <b>الـ hardware + الـ OS kernel كلهم hardware</b>. وبيوفّر interface <b>مطابق للـ bare hardware</b>. الـ OS بيعمل وهم (illusion) إن كل process شغالة على <b>processor خاص بيها وmemory خاصة (virtual)</b>.",
"إزاي؟ الموارد الفعلية بتتشارك: <b>CPU scheduling</b> بيدّي المظهر إن كل process عندها processor · و<b>spooling + file system</b> بيوفّروا virtual line printers وvirtual card readers.",
"<b>المميزات:</b> <b>حماية كاملة</b> لموارد النظام لأن كل VM معزولة عن التانية · وسيلة ممتازة لـ <b>أبحاث وتطوير الـ OS</b> لأن التطوير بيتم على الـ VM مش على جهاز حقيقي فمبيعطّلش الشغل العادي.",
"<b>العيوب:</b> العزل بيمنع <b>الـ direct sharing</b> للموارد · ومفهوم الـ VM <b>صعب التنفيذ</b> لأنه محتاج نسخة مطابقة تماماً للجهاز الأصلي.",
"الرسمة System Models: على الشمال Non-virtual machine (processes ← kernel ← hardware). على اليمين Virtual machine (كل مجموعة processes لها kernel خاص بيها ← فوق virtual machine layer ← فوق hardware)."],
why:"الـ VM هي أساس الـ virtualization اللي بتشوفها في الـ cloud.",
mis:"الـ isolation ميزة وعيب في نفس الوقت: حماية كاملة لكن بدون sharing مباشر.",
mem:"VM = <b>Isolation</b>: ✔ Protection ✔ Safe development ✖ No sharing ✖ Hard to implement."},

'2-11':{ar:[
"<b>أهداف التصميم:</b> <b>User goals</b>: الـ OS يكون مريح وسهل التعلم وموثوق وآمن وسريع. <b>System goals</b>: سهل في التصميم والتنفيذ والصيانة، ومرن وموثوق وخالي من الأخطاء وكفء.",
"<b>التنفيذ:</b> تقليدياً بيتكتب بـ assembly، لكن دلوقتي بـ <b>high-level languages</b>: بتتكتب أسرع، وأصغر، وأسهل في الفهم والـ debugging، وأسهل بكتير في الـ <b>port</b> (النقل لـ hardware تاني).",
"<b>Mechanisms vs Policies:</b> الـ <b>mechanism</b> بيحدد <b>إزاي</b> (HOW) تعمل حاجة، والـ <b>policy</b> بتقرر <b>إيه</b> (WHAT) اللي هيتعمل. <b>فصل الـ policy عن الـ mechanism</b> مبدأ مهم جداً لأنه بيدّي أقصى مرونة لو قرارات الـ policy اتغيّرت بعدين.",
"مثال: الـ <b>timer</b> اللي بيقاطع الـ CPU كل شوية = mechanism. ومدة الـ time slice (كام ms) = policy."],
why:"لو فصلت الـ policy عن الـ mechanism، تقدر تغيّر القرارات من غير ما تعيد كتابة الـ OS.",
mis:"أكتر غلطة: قلب التعريف. <b>Mechanism = HOW</b> و<b>Policy = WHAT</b>.",
mem:"M-H / P-W: <b>M</b>echanism = <b>H</b>ow · <b>P</b>olicy = <b>W</b>hat."},

'3-0':{ar:[
"<b>البرنامج</b> (program) ملف ساكن على الـ disk. <b>الـ Process</b> هو البرنامج وهو <b>شغّال (in execution)</b>.",
"في المحاضرة الـ process معرّف كمان بأنه: الكيان اللي بيتخصص له processors، والـ <b>dispatchable unit</b>، أو الـ <b>locus of control</b> لإجراء بيتنفذ. وليه أسماء تانية، والكتب بتستخدم <b>job</b> و<b>process</b> تقريباً بنفس المعنى.",
"مثال: لو فتحت Chrome مرتين، ده <b>برنامج واحد</b> لكن <b>2 processes</b>."],
why:"الـ process هي وحدة الشغل اللي الـ OS بيجدولها ويديرها.",
mis:"Program ≠ Process. الـ program passive (على الـ disk) والـ process active (في الـ memory وبتتنفذ).",
mem:"Process = <b>Program in execution</b> (احفظها حرفياً)."},

'3-1':{ar:[
"الـ process بتمر بـ <b>5 حالات</b>:",
"<b>New:</b> الـ process بتتعمل. · <b>Ready:</b> جاهزة وبتستنى الـ CPU. · <b>Running:</b> بتتنفذ حالياً (معاها الـ CPU). · <b>Waiting (blocked):</b> مستنية حدث (زي انتهاء I/O). · <b>Terminated:</b> خلّصت.",
"<b>الانتقالات (Transitions):</b>",
"new → ready: <b>admitted</b> · ready → running: <b>scheduler dispatch</b> · running → ready: <b>interrupt</b> (مثلاً الـ time slice خلص) · running → waiting: <b>I/O or event wait</b> · waiting → ready: <b>I/O or event completion</b> · running → terminated: <b>exit</b>.",
"<b>قواعد مهمة:</b> <b>process واحدة بس</b> بتشتغل (running) في الوقت (على CPU واحد)، لكن كتير ممكن يكونوا ready أو waiting. قايمة الـ ready بتتنظم حسب <b>الأولوية (priority order)</b>، أما قايمة الـ waiting <b>مش مرتبة</b> إلا لو كلهم مستنيين نفس الـ event.",
"جرّب بنفسك في الـ simulator تحت 👇 والأزرار بتظهر الـ transitions الصحيحة بس."],
why:"فهم الـ state diagram هو أساس فهم الـ scheduling كله.",
mis:"أشهر غلطة: <b>waiting → running</b> مباشرة! الصح: waiting → <b>ready</b> وبعدين scheduler dispatch → running. وكمان running → ready بسبب <b>interrupt</b> (مش exit).",
mem:"قصة المستشفى: وصل (New) → استقبال (Ready) → عند الدكتور (Running) → تحاليل (Waiting) → يرجع للاستقبال (Ready) → يخرج (Terminated)."},

'3-2':{ar:[
"الـ <b>PCB</b> (Process Control Block) = <b>process descriptor</b>: data structure بتحتفظ بمعلومات عن الـ process. زي كارت بيانات.",
"محتوياتها: <b>Current state</b> · <b>Unique identification</b> (رقم الـ process) · <b>Pointer to the parent</b> · <b>Pointer to the child</b> · <b>Pointers to allocated resources</b> (مثلاً memory range) · <b>CPU scheduling information</b>.",
"لما الـ OS يبدّل الـ CPU من process لـ process تانية، بيحفظ حالة الأولى في الـ PCB بتاعتها وبيحمّل حالة التانية من الـ PCB بتاعتها."],
why:"من غير PCB الـ OS ميعرفش يوقف process ويرجّعها من نفس النقطة.",
mis:"الـ PCB مش بتحتوي على بيانات اليوزر (زي الملفات) — بتحتوي على بيانات <b>إدارة</b> الـ process.",
mem:"6 حاجات: <b>S-I-P-C-R-S</b> = State, ID, Parent, Child, Resources, Scheduling info."},

'3-3':{ar:[
"<b>الـ Queues:</b> <b>Job queue</b> = كل الـ processes في النظام · <b>Ready queue</b> = الـ processes اللي في الـ main memory وجاهزة تتنفذ · <b>Device queues</b> = الـ processes اللي مستنية جهاز I/O. والـ processes بتنتقل بين الـ queues دي (process migration).",
"<b>الـ Schedulers:</b>",
"<b>Long-term scheduler (job scheduler):</b> بيختار أنهي processes تدخل الـ ready queue. بيتنده <b>نادراً</b> (ثواني/دقائق) فممكن يكون بطيء. وهو اللي بيتحكم في <b>degree of multiprogramming</b> (عدد البرامج في الـ memory).",
"<b>Short-term scheduler (CPU scheduler):</b> بيختار أنهي process تتنفذ بعد كده وبيدّيها الـ CPU. بيتنده <b>كتير جداً</b> (milliseconds) فلازم يكون <b>سريع</b>.",
"<b>Medium-term scheduling:</b> بيعمل <b>swap out</b> لـ processes اتنفذ جزء منها ويرجّعها (<b>swap in</b>) بعدين.",
"في الرسمة Representation of Process Scheduling: ready queue → CPU، ومنها: I/O request → I/O queue → I/O → ready · time slice expired → ready · fork a child → child executes → ready · wait for an interrupt → interrupt occurs → ready."],
why:"الـ queues والـ schedulers هما اللي بيحددوا مين يشتغل إمتى.",
mis:"Long-term ≠ Short-term: الـ long بيختار مين <b>يدخل</b> الـ ready queue، والـ short بيختار مين <b>ياخد الـ CPU</b>.",
mem:"Long = <b>L</b>ess often (بطيء) · Short = <b>S</b>oon & fast (milliseconds)."},

'3-4':{ar:[
"الـ processes بتنقسم نوعين حسب طبيعة شغلها:",
"<b>I/O-bound process:</b> بتقضي وقت أكتر في الـ I/O من الحسابات، وليها <b>many short CPU bursts</b> (فترات CPU قصيرة كتير). مثال في المحاضرة: <b>Scanner</b>.",
"<b>CPU-bound process:</b> بتقضي وقت أكتر في الحسابات، وليها <b>few very long CPU bursts</b> (فترات CPU قليلة وطويلة جداً). مثال: <b>Calculator</b>.",
"الـ long-term scheduler الشاطر بيخلط النوعين عشان الـ CPU والـ I/O devices الاتنين يفضلوا مشغولين."],
why:"معرفة النوع بتساعد الـ scheduler يوازن الحمل.",
mis:"متقلبش التعريفات: I/O-bound = bursts <b>كتير وقصيرة</b>، CPU-bound = bursts <b>قليلة وطويلة</b>.",
mem:"Scanner = I/O · Calculator = CPU."},

'3-5':{ar:[
"<b>العمليات على الـ process:</b> Create · Destroy · Suspend · Resume · Change priority · Block · Wakeup · Dispatch (run on CPU) · Enable communication (IPC).",
"<b>Process Creation:</b> تسمّي الـ process · تدخلها في <b>process table</b> · تحدد الـ <b>initial priority</b> · تعمل الـ <b>PCB</b> · تحجز الـ <b>initial resources</b>.",
"الـ process اللي بتنشئ تانية = <b>parent</b> والمنشأة = <b>child</b>. النتيجة: <b>شجرة هرمية</b> — كل child له <b>parent واحد</b>، لكن الـ parent ممكن يبقى له <b>أكتر من child</b>.",
"<b>Resource sharing</b> (واحدة من 3): الأب والأبناء يتشاركوا كل الموارد · الأبناء يتشاركوا subset من موارد الأب · مفيش مشاركة. <b>Execution</b> (واحدة من 2): الأب والأبناء ينفّذوا concurrently · أو الأب يستنى لحد ما الأبناء يخلصوا.",
"<b>Process Termination:</b> تشيلها من النظام · ترجّع الموارد · تمسح الـ PCB. وفي بعض الأنظمة الـ child بتتدمّر تلقائياً لما الأب يتدمّر، وفي أنظمة تانية بتكمّل شغل مستقلة.",
"دوس على أي node في الشجرة 👇"],
why:"فهم الشجرة بيفسّر إزاي الـ OS بيبدأ الـ processes (كل process لها أصل).",
mis:"الـ child له parent <b>واحد</b> بس. والـ parent ممكن له كتير. وكمان متنساش خطوة <b>إنشاء الـ PCB</b>.",
mem:"Creation: <b>Name → Table → Priority → PCB → Resources</b>. Termination: <b>Remove → Return resources → Erase PCB</b>."},

'3-6':{ar:[
"الـ <b>Thread</b> (lightweight process) هو الوحدة الأساسية لاستخدام الـ CPU، وله <b>PCB خاص بيه</b>.",
"الـ thread بيتشارك مع الـ peer threads: <b>code section</b> و<b>data section</b> و<b>OS resources</b> — وكل ده مع بعض اسمه <b>task</b>. والـ <b>heavyweight process</b> التقليدية = task فيها <b>thread واحد</b>.",
"<b>الفايدة:</b> في task فيها threads كتير، لو thread اتبلوكت، thread تانية في نفس الـ task تكمّل → <b>throughput وperformance أعلى</b> (مثال: صفحات الـ WWW). والتطبيقات اللي بتتشارك buffer مشترك (Producer-Consumer) بتستفيد.",
"<b>أنواع الـ threads:</b> <b>Kernel-level</b> (Mac و OS/2) · <b>User-level</b> (Project Andrew من CMU) عن طريق thread library — وعيبها لو الـ kernel مش بيدعم threads · <b>Hybrid</b> بيجمع الاتنين (Solaris 2)."],
why:"الـ threads أخف من الـ processes في الإنشاء والتبديل لأنها بتتشارك الموارد.",
mis:"الـ thread بتتشارك code وdata وresources، لكن ليها <b>PCB خاص</b>. وكمان heavyweight process = task بـ thread واحد مش 'بدون threads'.",
mem:"Process = شقة · Threads = ساكنين الشقة (يتشاركوا المطبخ لكن لكل واحد أوضته)."},

'3-7':{ar:[
"الـ <b>IPC</b> (Interprocess Communication) هي آلية تخلّي الـ processes تتواصل وتنسّق أفعالها (<b>synchronize</b>). في الـ <b>message system</b> بتتواصل من غير shared variables.",
"في عمليتين بس: <b>send(message)</b> و<b>receive(message)</b> (حجم الرسالة fixed أو variable).",
"لو P و Q عايزين يتواصلوا لازم: يعملوا <b>communication link</b> بينهم + يتبادلوا رسايل بـ send/receive. والـ link ممكن يكون <b>physical</b> (shared memory، hardware bus) أو <b>logical</b>.",
"<b>الخيارات المنطقية (Logical IPC):</b> Direct أو Indirect · Symmetric أو Asymmetric · Automatic أو Explicit buffering · Send by copy أو by reference · Fixed أو Variable size."],
why:"من غير IPC كل process هتفضل معزولة ومفيش تعاون.",
mis:"الـ IPC مش لازم تستخدم shared variables؛ الـ message system هو البديل.",
mem:"<b>send / receive</b> + <b>link</b>."},

'3-8':{ar:[
"<b>Direct communication:</b> الـ processes لازم <b>تسمّي بعض صراحةً</b>: <b>send(P, message)</b> يبعت لـ P · <b>receive(Q, message)</b> يستقبل من Q. الخصائص: الـ links بتتعمل <b>تلقائياً</b> · الـ link مرتبط بـ <b>زوج واحد بالظبط</b> · بين كل زوج <b>link واحد بالظبط</b> · ممكن unidirectional لكن غالباً bi-directional.",
"<b>Indirect communication:</b> الرسايل بتتوجّه وتتستقبل من <b>mailboxes</b> (اسمها كمان <b>ports</b>) · كل mailbox ليها <b>ID فريد</b> · الـ processes لازم تتشارك mailbox عشان تتواصل. الخصائص: الـ link بيتعمل <b>بس لو في mailbox مشترك</b> · الـ link ممكن يرتبط <b>بأكتر من process</b> · كل زوج ممكن يتشارك <b>أكتر من link</b> · uni أو bi-directional. العمليات: <b>create</b> mailbox جديد · send/receive عبره · <b>destroy</b> mailbox."],
why:"الاختيار بينهم بيأثر على المرونة: indirect أكتر مرونة (أكتر من process على نفس الـ mailbox).",
mis:"في Direct الـ link <b>واحد</b> لكل زوج، لكن في Indirect ممكن <b>أكتر من link</b> لنفس الزوج.",
mem:"Direct = رقم موبايل (مباشر) · Indirect = صندوق بريد مشترك."},

'3-9':{ar:[
"الـ <b>Buffering</b> = <b>queue of messages</b> مربوطة بالـ link. وبتتنفذ بـ 3 طرق:",
"<b>1) Zero capacity:</b> سعة <b>0 رسالة</b> (مفيش buffer) ← الـ <b>sender لازم يستنى</b> الـ receiver (rendezvous).",
"<b>2) Bounded capacity:</b> طول محدود <b>n رسالة</b> ← الـ sender لازم يستنى لو الـ link <b>مليان</b>.",
"<b>3) Unbounded capacity:</b> طول <b>لانهائي</b> ← الـ sender <b>عمره ما بيستنى</b>.",
"جرّب الـ simulator تحت: غيّر النوع واضغط Send/Receive وراقب مين بيتبلوك 👇"],
why:"نوع الـ buffering بيحدد هل الـ sender هيتبلوك ولا لأ.",
mis:"Zero capacity مش معناه إن الـ sender بيستنى بس لما الـ link ممتلي — هو بيستنى <b>دايماً</b> الـ receiver لأن مفيش مكان يخزن الرسالة.",
mem:"Zero → Sender <b>always waits</b> · Bounded → waits <b>if full</b> · Unbounded → <b>never waits</b>."},
'4-0':{ar:[
"<b>الفكرة:</b> في أي OS بيشغّل أكتر من برنامج (<b>multi-programmed</b>)، في أكتر من process جاهزة تستخدم الـ CPU في نفس الوقت، لكن فيه CPU واحد. فلازم حد يقرر <b>مين ياخد الـ CPU دلوقتي</b> — ده شغل الـ <b>CPU scheduler</b>.",
"<b>الهدف الأساسي:</b> <b>maximize CPU utilization</b> يعني الـ CPU ميبقاش فاضي. لو process وقفت تستنى I/O، الـ scheduler يديّ الـ CPU لـ process تانية فوراً.",
"<b>Process cycles:</b> أي process طول حياتها بتتنقل بين <b>CPU burst</b> (بتحسب وتنفّذ instructions) و<b>I/O burst</b> (بتستنى القراءة أو الكتابة). والدورة <b>بتبدأ بـ CPU burst</b>.",
"في الشريحة (Sequence of CPU and I/O bursts): load store / add store / read from file ← CPU burst ← wait for I/O ← I/O burst ← store increment index / write to file ← CPU burst ← wait for I/O ← I/O burst … وهكذا."],
why:"من غير scheduling الـ CPU هيفضل واقف مستني I/O بطيء، وده بيضيّع أغلى مورد في الجهاز.",
mis:"الـ CPU burst مش هي الـ process كلها؛ الـ process فيها <b>كذا burst</b> بينهم I/O bursts. والـ cycle بتبدأ بـ CPU burst مش بـ I/O.",
mem:"الكاشير (CPU) ميقعدش فاضي: CPU burst ↔ I/O burst ↔ CPU burst … والهدف <b>Max CPU utilization</b>."},

'4-1':{ar:[
"الباحثين قاسوا بتاع الـ CPU bursts كتير جداً (extensively measured). وطلع إن الرسم بتاع <b>التكرار (frequency)</b> بيبقى <b>exponential أو hyper exponential</b>.",
"يعني إيه؟ <b>أغلب الـ bursts قصيرة جداً (several short bursts)</b> وعدد قليل بس طويلة (a few longer bursts). في الـ histogram: العمود الأول عالي جداً (حوالي 150) وبعدين الرسم بينزل بسرعة ويفضل واطي على طول محور الـ burst duration (بالـ milliseconds).",
"الاستنتاج العملي: أغلب الـ processes <b>I/O-bound</b>، فالـ scheduler لازم يخدم الـ bursts القصيرة بسرعة عشان ميضيّعش الـ CPU."],
why:"شكل الـ bursts هو اللي بيفسّر ليه خوارزميات زي SJF و RR بتشتغل كويس.",
mis:"متقولش إن الرسم linear أو uniform — هو exponential/hyper exponential. وكمان 'bursts قصيرة كتير' ≠ 'الـ process كلها قصيرة'.",
mem:"مكالماتك: كتير قصيرة وقليل جداً طويلة. الكلمتين: <b>short many · long few</b>."},

'4-2':{ar:[
"<b>Nonpreemptive:</b> أول ما الـ process تاخد الـ CPU، <b>محدش يقدر ياخده منها</b> لحد ما تخلص الـ burst أو تستنى I/O. زي مكالمة محدش يقطعها.",
"<b>Preemptive:</b> الـ CPU <b>ممكن يتاخد</b> من الـ process وهي شغالة (مثلاً process أهم وصلت). مفيد جداً في الأنظمة اللي فيها <b>high-priority processes</b> محتاجة <b>rapid attention</b> (رد سريع).",
"عشان الـ preemptive يشتغل صح لازم <b>processes كتير تفضل في الـ primary memory</b> عشان لما الـ CPU يفضى تبقى جاهزة الـ process اللي بعدها.",
"في الـ nonpreemptive: <b>الـ short jobs بتستنى الـ long jobs</b> لكن معاملة كل الـ processes <b>عادلة (fair)</b>. وكمان <b>الـ response time أكتر توقعاً (predictable)</b> لأن شغلانة high-priority جديدة <b>مش هتقدر تزيح</b> الشغلانات المستنية."],
why:"اختيار preemptive أو nonpreemptive هو أول قرار في تصميم أي scheduler.",
mis:"الـ nonpreemptive مش 'ظالم' — الشريحة بتقول إن المعاملة <b>fair</b> لكن الـ short jobs بتستنى. متخلطش بينها وبين FCFS (اللي هي أصلاً nonpreemptive).",
mem:"<b>Non</b> = مفيش حد ياخد منك. <b>Pre</b>emptive = ممكن <b>يسبقوك ويخدوا</b> الـ CPU."},

'4-3':{ar:[
"الـ scheduling على <b>3 مستويات</b> بيتحرك فيها الـ job من أول ما يدخل لحد ما يخلص (راجع الرسمة):",
"<b>1) High-level scheduling:</b> اسمه <b>job scheduling أو admission scheduling</b>. بيحدد <b>أنهي job تدخل النظام</b>. بعد ما تدخل بتتحوّل لـ process أو مجموعة processes. (في الرسمة: Jobs waiting for entry → job entry → Jobs waiting for initiation → job initiation.)",
"<b>2) Intermediate-level scheduling:</b> بيحدد <b>أنهي processes تتنافس على الـ CPU</b>. بيتجاوب مع التقلبات القصيرة بـ <b>suspend و resume</b> للـ processes. وهو بيشتغل كـ <b>buffer</b> بين دخول الـ jobs للنظام وإعطائها الـ CPU. (في الرسمة: Suspended process waiting for activation ⇄ activate / suspend ⇄ Active processes.)",
"<b>3) Low-level scheduling:</b> بيحدد <b>أنهي process هتاخد الـ CPU لما يفضى</b> (dispatch). بيتنفذ بواسطة الـ <b>dispatcher</b> اللي بيشتغل <b>مرات كتير في الثانية</b> ولازم يفضل <b>موجود في الـ primary storage طول الوقت</b>. (في الرسمة: Active → dispatch → Running ، و block or time-out بترجّعها، و complete → Completed.)",
"<b>Dispatch latency</b> = الوقت اللي الـ dispatcher بياخده عشان <b>يوقّف process ويبدأ تانية</b>."],
why:"التقسيم لـ 3 مستويات بيفصل قرار 'مين يدخل' عن 'مين يستنى' عن 'مين يشتغل دلوقتي'.",
mis:"الـ dispatcher تبع الـ <b>Low-level</b> مش الـ High-level. والـ High-level اسمه كمان <b>admission</b> scheduling. وdispatch latency مش وقت تنفيذ الـ process.",
mem:"<b>H</b>igh = <b>H</b>ire (يدخل الشركة) · <b>I</b>ntermediate = <b>I</b>dle/suspend · <b>L</b>ow = <b>L</b>aunch على الـ CPU."},

'4-4':{ar:[
"دي الـ <b>5 معايير</b> اللي بنقيس بيها الخوارزميات:",
"<b>CPU utilization:</b> نخلي الـ CPU مشغول أكتر وقت ممكن. (هدف: <b>Max</b>)",
"<b>Throughput:</b> عدد الـ processes اللي <b>بتخلّص</b> في وحدة الزمن. (هدف: <b>Max</b>)",
"<b>Turnaround time:</b> الوقت الكلي لتنفيذ process معينة (من وقت الوصول لحد ما تخلص). (هدف: <b>Min</b>)",
"<b>Waiting time:</b> الوقت اللي الـ process <b>قعدته في الـ ready queue</b>. (هدف: <b>Min</b>)",
"<b>Response time:</b> الوقت من لحظة تقديم الطلب لحد ما <b>أول response</b> يتطلع (<b>مش آخر output</b>) — مهم في الـ time-sharing. (هدف: <b>Min</b>)",
"العلاقة (إضافة للتوضيح): <b>waiting = turnaround − burst</b> و <b>turnaround = finish − arrival</b>."],
why:"من غير معايير مفيش طريقة نقول إن خوارزمية أحسن من التانية.",
mis:"الـ <b>response time</b> أول رد مش آخر نتيجة. والـ <b>waiting time</b> في الـ ready queue بس مش وقت الـ I/O. والـ 2 الأولين بنكبّرهم والـ 3 الباقيين بنصغّرهم.",
mem:"<b>MAX</b>: utilization + throughput · <b>MIN</b>: turnaround + waiting + response (T-W-R)."},

'4-5':{ar:[
"الأولوية (priority) بتتحدد بطرق متعددة وكلها في الشريحة:",
"<b>Automatically by the system أو externally:</b> السيستم نفسه يحددها (حسب الموارد مثلاً) أو حد من بره (المستخدم/المدير).",
"<b>Earned أو bought:</b> ممكن تكسبها بسلوكك أو تشتريها (زي مستخدم بيدفع عشان ياخد أولوية أعلى).",
"<b>Static أو dynamic:</b>",
"• <b>Static:</b> مبتتغيرش — <b>سهل في التنفيذ</b> بس <b>مش بيتجاوب مع التغييرات الخارجية</b>.",
"• <b>Dynamic:</b> ممكن تتغير حتى بعد فترة قصيرة — <b>تنفيذها معقّد</b> بس <b>بيتجاوب مع التغييرات الخارجية</b>."],
why:"الأولويات هي أساس الـ priority scheduling والـ multilevel queues.",
mis:"Static مش معناها 'سريعة' — معناها 'ثابتة'. والـ dynamic مش أسهل — دي أصعب في التنفيذ.",
mem:"Static = <b>S</b>imple but <b>S</b>tuck · Dynamic = <b>D</b>ifficult but <b>D</b>oes adapt."},

'4-6':{ar:[
"الـ 8 خوارزميات اللي هنمشي عليهم بالترتيب: Deadline → FCFS → RR → SJF → Priority → Multilevel Feedback Queue → Multiple-Processor → Real-Time. (الشريحة كاتبة SJR بس المقصود SJF.)",
"<b>Deadline Scheduling:</b> الـ jobs بتتجدول عشان تخلّص في <b>وقت محدد (deadline)</b>. لو اتسلّمت في الميعاد = <b>very high priority</b>، ولو اتسلّمت بعد الـ deadline = <b>worthless</b> (ملهاش قيمة).",
"<b>ليه معقّد جداً؟</b> 5 أسباب:",
"1) اليوزر لازم يدّي <b>متطلبات الموارد بدقة مقدماً</b> — ونادراً ما تكون المعلومة دي متاحة.",
"2) السيستم لازم يشغّل الـ deadline job <b>من غير ما يضر بخدمة باقي المستخدمين</b>.",
"3) السيستم لازم <b>يخطط لمتطلبات موارده</b> لحد الـ deadline.",
"4) لو في <b>deadline jobs كتير شغّالة مع بعض</b> بيبقى التجدول أعقد.",
"5) محتاج <b>intensive resource management</b> (إدارة موارد مكثفة)."],
why:"الـ deadline scheduling بيوضح إن بعض الشغل قيمته مرتبطة بالوقت مش بس بالترتيب.",
mis:"الـ deadline job اللي اتأخرت <b>worthless</b> مش 'low priority'. والسبب الأول للتعقيد إن معلومات الموارد <b>نادرة</b> مقدماً.",
mem:"<b>8 algorithms</b>: D-F-R-S-P-M-M-R. و5 أسباب للـ deadline: info rare · don't degrade others · plan resources · many jobs · intensive management."},

'4-7':{ar:[
"<b>FCFS</b> (أو FIFO): الـ processes بتتنفّذ <b>بترتيب وصولها (arrival time)</b>. الأول يدخل الأول يخلص.",
"<b>عادل شكلياً (fair in formal sense)</b> لكن <b>ظالم للـ short jobs</b> اللي بتستنى ورا jobs طويلة. وهو <b>nonpreemptive</b>. ونادراً ما يُستخدم كـ master scheme لكن ممكن يُستخدم مع خوارزمية تانية.",
"<b>المثال الأول:</b> (P1,24) (P2,3) (P3,3) بيوصلوا بالترتيب P1,P2,P3. الـ Gantt: P1 من 0 لـ 24، P2 من 24 لـ 27، P3 من 27 لـ 30. الـ waiting: P1=0 · P2=24 · P3=27 ← المتوسط = (0+24+27)/3 = <b>17</b>.",
"<b>المثال التاني:</b> نفس الـ processes بس بالترتيب P2,P3,P1: P2 من 0 لـ 3، P3 من 3 لـ 6، P1 من 6 لـ 30. الـ waiting: P1=6 · P2=0 · P3=3 ← المتوسط = (6+0+3)/3 = <b>3</b> — <b>أحسن بكتير</b>.",
"الخلاصة: ترتيب الوصول بيأثر جداً على متوسط الانتظار، و<b>FCFS مش بيضمن response time كويس</b>. (إضافة: الظاهرة دي بتتسمى convoy effect — لما process طويلة تأخّر كل اللي وراها.)"],
why:"FCFS أبسط خوارزمية، وبيبيّن ليه محتاجين خوارزميات أذكى.",
mis:"متحسبش الـ waiting time من وقت الـ burst — الـ waiting هو وقت الانتظار قبل ما تبدأ. وP1 في الـ Gantt الأول waiting = 0 مش 24.",
mem:"17 → 3: نفس الشغل بس <b>القصير الأول</b> بيخفّض الانتظار من 17 لـ 3."},

'4-8':{ar:[
"<b>RR:</b> كل process بتاخد <b>جزء صغير من الـ CPU (time slice أو quantum)</b>، عادةً <b>10–100 ms</b>. لو الوقت خلص قبل ما تخلّص → بتتعمل <b>preempt</b> وتترجع <b>آخر الـ ready queue</b>، والـ CPU بيروح للي بعدها.",
"لو في <b>n</b> processes والـ quantum = <b>q</b>: كل process بتاخد <b>1/n</b> من وقت الـ CPU على chunks أقصاها q. و<b>مفيش process بتستنى أكتر من (n−1)q</b>.",
"<b>الأداء:</b> لو <b>q كبير</b> → بيتصرف زي <b>FIFO</b>. ولو <b>q صغير</b> → لازم يبقى كبير بالنسبة لوقت الـ context switch وإلا الـ overhead هيبقى عالي.",
"مناسب جداً لـ <b>time-sharing</b>، بيضمن <b>response time معقول</b>، وفيه <b>preemption overhead قليل</b>.",
"<b>مثال (q=20):</b> (P1,53) (P2,17) (P3,68) (P4,24). الـ Gantt: P1 0–20 ، P2 20–37 ، P3 37–57 ، P4 57–77 ، P1 77–97 ، P3 97–117 ، P4 117–121 ، P1 121–134 ، P3 134–154 ، P3 154–162. (P2 خلّصت في 37 لأن burst بتاعها 17 < 20.)",
"<b>Smaller quantum → أكتر context switches → overhead أعلى.</b> في الرسمة (process time = 10): quantum 12 ← 0 switches · quantum 6 ← 1 switch · quantum 1 ← 9 switches."],
why:"الـ RR هو أساس الـ time-sharing وبيضمن إن محدش يستنى كتير.",
mis:"الـ quantum <b>مش</b> وقت الـ process كله. وكمان متقولش إن الـ q الصغير دايماً أحسن — بيزوّد الـ context switches. والـ P3 الأخيرة في الـ Gantt قسمين (134–154 و 154–162) لأنها الوحيدة اللي فاضلة.",
mem:"<b>(n−1)q</b> = أقصى انتظار. وقاعدة الـ q: كبير = FIFO · صغير = overhead."},

'4-9':{ar:[
"<b>SJF:</b> الـ process اللي <b>أقل estimated run-time-to-completion</b> هي اللي بتتنفّذ الأول.",
"<b>نسختين:</b>",
"• <b>Nonpreemptive:</b> أول ما الـ CPU يتدّي لـ process مينفعش تتقاطع لحد ما تخلّص الـ CPU burst.",
"• <b>Preemptive (SRTF):</b> لو وصلت process جديدة الـ burst بتاعها <b>أقل من الوقت المتبقي</b> للـ process الشغالة → <b>بنقاطع</b>. الاسم: <b>Shortest-Remaining-Time-First</b>.",
"<b>SJF هو optimal</b> — بيدّي <b>أقل average waiting time</b> لأي مجموعة processes. وفيه <b>average turnaround أقل من RR</b> لكن <b>response أطول</b>.",
"<b>البيانات:</b> P1 (arrival 0, burst 7) · P2 (2, 4) · P3 (4, 1) · P4 (5, 4).",
"<b>Non-preemptive SJF:</b> P1 0–7 ، P3 7–8 ، P2 8–12 ، P4 12–16. الـ waiting: P1=0 · P2=6 · P3=3 · P4=7 ← المتوسط (0+6+3+7)/4 = <b>4</b>.",
"<b>Preemptive SJF (SRTF):</b> P1 0–2 ، P2 2–4 ، P3 4–5 ، P2 5–7 ، P4 7–11 ، P1 11–16. الـ waiting: P1=9 · P2=1 · P3=0 · P4=2 ← المتوسط (9+1+0+2)/4 = <b>3</b>."],
why:"SJF هو المعيار الذهبي لأقل waiting time، بس محتاج تعرف أو تقدّر الـ burst.",
mis:"SJF هو optimal في <b>average waiting time</b> مش response time. والـ SRTF هو الـ preemptive version مش خوارزمية تانية. ومتحسبش الـ waiting في الـ SRTF بدون ما تطرح وقت الوصول.",
mem:"<b>4</b> للـ non-preemptive و <b>3</b> للـ SRTF. و SRTF = <b>S</b>hortest-<b>R</b>emaining-<b>T</b>ime-<b>F</b>irst."},

'4-10':{ar:[
"كل process ليها <b>رقم أولوية (priority number)</b>. الـ CPU بيتدّي للـ process صاحبة <b>أعلى أولوية</b> — و<b>الرقم الأصغر = أولوية أعلى</b>. ممكن تكون <b>preemptive</b> أو <b>nonpreemptive</b>.",
"<b>SJF هو حالة خاصة من الـ priority scheduling</b> اللي فيها الأولوية = الـ CPU burst المتوقع الجاي (كل ما أقصر = أولوية أعلى).",
"<b>المشكلة — Starvation:</b> الـ processes ذات الأولوية المنخفضة ممكن <b>مترجعش تتنفّذ أبداً</b>.",
"<b>الحل — Aging:</b> مع مرور الوقت <b>بنزوّد أولوية</b> الـ process اللي مستنية."],
why:"الـ priority scheduling هو أبسط طريقة لإن الشغلانات المهمة تخلص الأول.",
mis:"الرقم الأصغر = أولوية <b>أعلى</b> (مش العكس). والـ aging بتزوّد الأولوية مش بتقلّلها.",
mem:"<b>Starvation → Aging</b>. و <b>Smallest = Strongest</b>."},

'4-11':{ar:[
"الـ ready queue بتتقسم لـ <b>طوابير منفصلة</b>: <b>foreground (interactive)</b> و <b>background (batch)</b>.",
"كل queue ليها <b>algorithm خاص بيها</b>: الـ foreground بـ <b>RR</b> والـ background بـ <b>FCFS</b>.",
"ولازم يحصل scheduling <b>بين الـ queues</b> كمان — بطريقتين:",
"1) <b>Fixed priority scheduling:</b> نخدّم كل الـ foreground الأول وبعدين الـ background. فيه احتمال <b>starvation</b> للـ background.",
"2) <b>Time slice:</b> كل queue بتاخد نسبة من وقت الـ CPU تجدولها بين processes بتاعتها — مثلاً <b>80% للـ foreground بـ RR</b> و <b>20% للـ background بـ FCFS</b>.",
"الرسمة (من الأعلى أولوية للأقل): system processes ← interactive processes ← interactive editing processes ← batch processes ← student processes."],
why:"المستخدم التفاعلي محتاج رد سريع (RR)، والـ batch ممكن يستنى (FCFS)، فبنفصلهم.",
mis:"الـ multilevel queue مش بتنقل الـ process بين الـ queues (ده الـ feedback). وكمان fixed priority بيعمل starvation.",
mem:"فوق = <b>RR</b> (للناس) · تحت = <b>FCFS</b> (للـ batch). و 80/20 = Time slice."},

'4-12':{ar:[
"زي الـ multilevel queue بس <b>الـ process بتتنقل بين الـ queues</b> — وبالطريقة دي نقدر نطبّق <b>aging</b>.",
"الـ multilevel-feedback-queue scheduler بيتعرّف بـ <b>5 parameters</b>: عدد الـ queues · الـ algorithm لكل queue · طريقة تحديد إمتى نعمل <b>upgrade</b> لـ process · طريقة تحديد إمتى نعمل <b>demote</b> · طريقة تحديد الـ queue اللي هتدخله الـ process لما تحتاج خدمة.",
"<b>المثال (3 queues):</b> <b>Q0</b> = quantum 8 ms · <b>Q1</b> = quantum 16 ms · <b>Q2</b> = FCFS.",
"<b>الـ job الجديدة</b> بتدخل Q0 (بتتخدم FCFS). لما تاخد الـ CPU بتاخد <b>8 ms</b>. لو ماخلصتش → بتتنقل لـ <b>Q1</b>.",
"في Q1 بتتخدم تاني وبتاخد <b>16 ms إضافية</b>. لو لسه ماخلصتش → بتتعمل <b>preempt</b> وبتتنقل لـ <b>Q2</b> (FCFS).",
"النتيجة: الـ jobs القصيرة بتخلص بسرعة في Q0، والطويلة بتنزل للمستويات الأبطأ."],
why:"بيدّي الـ short jobs أولوية من غير ما نعرف طولها مقدماً.",
mis:"الـ job الجديدة بتدخل Q0 <b>دايماً</b>. وQ2 هي FCFS مش RR. والنزول من Q0 لـ Q1 بيحصل لو ماخلصتش في <b>8 ms</b> مش 16.",
mem:"<b>8 → 16 → FCFS</b>: الـ quantum بيكبر وبعدها FCFS."},

'4-13':{ar:[
"لما يبقى عندك <b>أكتر من CPU</b> الـ scheduling بيبقى <b>أعقد</b>.",
"<b>Homogeneous system:</b> الـ processes <b>متطابقة في الوظيفة</b> — والسؤال: هل أي process تقدر تشتغل على أي processor؟",
"<b>Heterogeneous system:</b> البرامج لازم <b>تتعمل compile</b> لتعليمات الـ processors المناسبة.",
"<b>Load sharing – Load balancing:</b> توزيع الحمل بالتساوي. وفيه طريقتين:",
"• <b>queue لكل processor</b> ← <b>Self-Scheduling</b> ← <b>Symmetric Multiprocessing</b>.",
"• <b>common ready queue</b> لكل الـ processors بيتحكم فيها processor واحد ← <b>Master-Slave</b> ← <b>Asymmetric Multiprocessing</b> — وده <b>بيقلل الحاجة لمشاركة البيانات (data sharing)</b>."],
why:"الأجهزة الحديثة كلها multi-core، فالتوزيع بين الـ CPUs أساسي.",
mis:"الربط: queue لكل processor = <b>symmetric</b> (مش asymmetric). والـ common queue = <b>master-slave</b>.",
mem:"<b>S</b>elf = <b>S</b>ymmetric · <b>M</b>aster = <b>A</b>symmetric (واحد بيدير الباقي)."},

'4-14':{ar:[
"<b>Hard real-time:</b> لازم نعرف <b>الوقت الدقيق لكل task</b>. التجدول بيبقى إما <b>pre-determined (محدد مسبقاً)</b> أو بـ <b>resource reservation</b>.",
"<b>Resource reservation:</b> الـ task بتحاول <b>تحجز الموارد قبل ما تبدأ</b>، ولو الموارد كلها مش متاحة بتتعمل <b>rejected</b> (يعني مش بتبدأ خالص).",
"<b>Soft real-time:</b> الـ real-time processes بتاخد <b>أولوية على باقي الـ processes</b>.",
"ولازم يبقى عندها <b>dispatch latency صغيرة</b>، وغالباً بتتنفّذ بالـ <b>preemption</b>."],
why:"الأنظمة اللي فيها وقت حرج (طيارة، جهاز طبي) محتاجة ضمان توقيت مش مجرد سرعة.",
mis:"الـ hard محتاجة resource reservation أو pre-determined schedule، والـ soft بتتعامل بالأولوية بس. وكمان الـ small dispatch latency مطلوبة في الـ <b>soft</b>.",
mem:"<b>Hard = Hold resources</b> (reservation) · <b>Soft = Strong priority + preemption</b>."},

'4-15':{ar:[
"<b>إزاي تستخدمه:</b> اختار <b>preset</b> من أمثلة المحاضرة، أو عدّل الـ arrival والـ burst والـ priority بنفسك، واختار الـ algorithm، وبعدين دوس <b>Run</b>.",
"هيرسملك <b>Gantt chart</b> ويحسبلك <b>waiting و turnaround</b> لكل process والمتوسط. قارن النتيجة بالأرقام في المحاضرة: FCFS = 17 / 3 · SJF = 4 · SRTF = 3.",
"جرّب تغيّر الـ quantum في الـ RR وشوف إزاي بيتغيّر عدد الـ context switches.",
"<b>نصيحة امتحان:</b> ارسم الـ Gantt بإيدك على ورقة الأول، وبعدين اتأكد من الـ simulator."],
why:"المسائل الحسابية بتتكرر في الامتحان، والتدريب بيثبّت الطريقة.",
mis:"في الـ RR الترتيب في الـ queue بيعتمد على ترتيب الدخول. وفي الـ SRTF بنقارن بالـ <b>remaining time</b> مش الـ burst الأصلي.",
mem:"Waiting = Finish − Arrival − Burst."}
};
function arBlock(n,i,t){
  const p=AR_PLUS[n+'-'+i];
  if(!p)return `<div class="box ar"><h4>🗣️ الشرح بالمصري</h4><ul>${t.ar.map(x=>'<li>'+x+'</li>').join('')}</ul></div>`;
  return `<div class="box ar"><h4>🗣️ الشرح بالمصري (بالتفصيل)</h4><ul>${p.ar.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
  ${p.why?`<div class="box why" dir="rtl">🤔 <b>ليه ده مهم؟</b> ${p.why}</div>`:''}
  ${p.mis?`<div class="box mis" dir="rtl">⚠️ <b>غلطات الطلبة:</b> ${p.mis}</div>`:''}
  ${p.mem?`<div class="box mem" dir="rtl">🧠 <b>إزاي تفتكرها:</b> ${p.mem}</div>`:''}`;
}

/* ============ VISUALIZATIONS ============ */
const VIZ={};
VIZ.objectives=el=>{
  const o=[['Convenience','🛋️','الجهاز يبقى سهل الاستخدام.'],['Ease of Communication','💬','تواصل بين اليوزر والجهاز (UI) وبين مكونات النظام.'],['Abstraction','🎭','برمجة مستقلة عن الـ hardware.'],['Efficiency','⚡','استخدام الموارد بكفاءة.'],['Monitoring & Alerting','🚨','يراقب ويبلّغ عن الأعطال.'],['Ability to Evolve','🌱','يتطور وتتضاف functions جديدة من غير ما الخدمات توقف.'],['Protection','🛡️','طبقة أمان لحماية بيانات اليوزر.'],['Increasing Performance','🚀','أعلى throughput وأقل وقت تنفيذ.']];
  el.innerHTML='<h5>🃏 دوس على الكارت (click a card)</h5><div class="grid">'+o.map((x,i)=>`<div class="mini" style="border-color:${PAL[i%8]}"><b>${x[1]} ${x[0]}</b><div class="more" dir="rtl">${x[2]}</div></div>`).join('')+'</div>';
  el.onclick=e=>{const m=e.target.closest('.mini');if(m)m.classList.toggle('open')};
};
VIZ.layers=el=>{
  const L=[['End User','#ff4fa3','المستخدم النهائي — بيستخدم الـ application programs بس.'],['Application Programs','#e91e8c','Word, Games, Database... بتطلب خدمات من الـ utilities والـ OS.'],['Utilities','#b565f0','System software مساعد (compilers, editors, file tools). الـ programmer بيتعامل معاها.'],['Operating Systems','#7b2ff7','بيدير الموارد ويفصل البرامج عن الـ hardware. الـ programmer بيستخدمه عبر system calls.'],['Computer Hardware','#5f2eea','CPU, memory, I/O. الـ OS designer بيصمّم الـ OS بحيث يتعامل معاه مباشرة.']];
  el.innerHTML='<h5>🧱 Layers of Computer System (click)</h5><div class="stack">'+L.map((l,i)=>`<div data-i="${i}" style="background:${l[1]};margin-left:${i*18}px;margin-right:${(4-i)*18}px">${l[0]}</div>`).join('')+'</div><div class="msg" dir="rtl">اختار طبقة...</div>';
  el.onclick=e=>{const d=e.target.closest('[data-i]');if(!d)return;el.querySelectorAll('.stack div').forEach(x=>x.classList.remove('on'));d.classList.add('on');$('.msg',el).innerHTML='<b>'+L[d.dataset.i][0]+':</b> '+L[d.dataset.i][2]};
};
VIZ.pyramid=el=>{
  const L=[['Registers','Fastest · most expensive · tiny · volatile','أسرع وأغلى حاجة وأصغرها، جوه الـ CPU. volatile.'],['Cache','Very fast · expensive · small · volatile','وسيط سريع بين الـ CPU والـ RAM. volatile.'],['Main Memory','Fast · medium cost · volatile','الـ RAM — الشغل الحالي. volatile (بيضيع لما الكهربا تقطع).'],['Electronic Disk','Fast storage (memory-based disk)','تخزين إلكتروني بسرعة قريبة من الـ memory (الأمان بيختلف حسب النوع).'],['Magnetic Disk','Slower · cheap · large · non-volatile','الـ hard disk — بيحفظ البيانات حتى لو الكهربا قطعت.'],['Optical Disk','Slow · cheap · removable · non-volatile','CD/DVD.'],['Magnetic Tapes','Slowest · cheapest · largest · non-volatile','للـ backup والأرشفة.']];
  el.innerHTML='<h5>🔺 Storage-Device Hierarchy (click a level)</h5><div class="hint">↑ أسرع وأغلى وvolatile &nbsp;|&nbsp; ↓ أبطأ وأرخص وnon-volatile</div><div class="pyr">'+L.map((l,i)=>`<div data-i="${i}" style="width:${34+i*11}%;background:linear-gradient(90deg,${PAL[0]},${PAL[1]});filter:hue-rotate(${i*-6}deg)">${l[0]}</div>`).join('')+'</div><div class="msg" dir="rtl">دوس على مستوى...</div>';
  el.onclick=e=>{const d=e.target.closest('[data-i]');if(!d)return;el.querySelectorAll('.pyr div').forEach(x=>x.classList.remove('on'));d.classList.add('on');const l=L[d.dataset.i];$('.msg',el).innerHTML=`<b>${l[0]}</b> — ${l[1]}<br>${l[2]}`};
};
VIZ.types=el=>{
  const T=[['📦','Simple Batch','مغسلة هدوم: بتجمع شنط كتير وتغسلها واحدة ورا التانية.',['Runs only <b>one job</b> at a time','Smoothed transition between jobs → max utilization','Programs/data submitted in <b>groups (batches)</b>']],
  ['🔀','Multi-programmed Batch','طباخ بيسلق مكرونة ويقطع سلطة وهي سالقة.',['Uses <b>job scheduling</b> to increase utilization','Stores <b>more than one program</b> in memory','Any one job rarely uses all resources','While a job waits for I/O, another uses the CPU']],
  ['⏱️','Time-Sharing','مدرس بيدّي كل طالب دقيقة بالدور.',['Switches between multiple jobs','<b>Interactive</b>, low response time','Many simultaneous users','A program shares in time only if it exists in memory']],
  ['💻','Personal (Desktop)','كل واحد عنده لابتوب خاص بيه.',['Every user has own memory, processors, I/O','Possible after microprocessors','Data shared through networks']],
  ['🧮','Parallel','10 عمال بيبنوا حيطة مع بعض.',['2+ CPUs sharing a common bus','Job must be split into independent small jobs','Exponential speed-up needs exponential processors']],
  ['🕸️','Distributed','فروع بنك مربوطة ببعض.',['Independent computers communicating over WAN/LAN, working as a single system','<b>Client-Server</b>: client needs service, server provides (print, DB, e-mail)','<b>Peer-to-Peer</b>: decentralized, peers provide services','Incremental growth']],
  ['⚡','Real-Time','Airbag العربية: لازم يفتح في ميلي ثانية (hard). فيديو على يوتيوب لو اتأخر شوية عادي (soft).',['Dedicated control apps: experiments, medical imaging, industrial control','Well-defined <b>fixed-time constraints</b>','<b>Hard</b>: secondary storage limited/absent, data in short-term memory, conflicts with time-sharing, not supported by general-purpose OS','<b>Soft</b>: multimedia, virtual reality; needs advanced OS features']],
  ['📱','Handheld','موبايل قديم/PDA.',['PDAs, cellular telephones','Issues: <b>limited memory</b>, <b>slow processors</b>, <b>small display screens</b>']]];
  el.innerHTML='<div class="grid">'+T.map((x,i)=>`<div class="mini" style="border-color:${PAL[i%8]}"><b>${x[0]} ${x[1]}</b><div class="more"><div dir="rtl" style="color:#e91e8c;margin-bottom:4px">💡 ${x[2]}</div><ul>${x[3].map(b=>'<li>'+b+'</li>').join('')}</ul></div></div>`).join('')+'</div>';
  el.onclick=e=>{const m=e.target.closest('.mini');if(m)m.classList.toggle('open')};
};
VIZ.interrupt=el=>{
  const S=[['▶️ CPU runs program','CPU بينفّذ برنامج المستخدم instruction ورا التانية.'],['🔔 Interrupt occurs','حصل event (مثلاً اليوزر داس key).'],['🔍 Check for interrupt','بعد ما الـ instruction تخلص، الـ CPU بيشيّك لو في interrupt معلّق.'],['💾 Save CPU state','الـ OS بيحفظ address الـ instruction المقاطعة + حالة الـ CPU.'],['➡️ Jump to ISR','الـ CPU بيروح للـ ISR عن طريق الـ interrupt vector.'],['✅ ISR completes','الـ handler خلّص شغله.'],['♻️ Restore CPU state','الـ OS يرجّع الحالة المحفوظة.'],['🏁 Program continues','البرنامج الأصلي بيكمّل من نفس النقطة.']];
  let i=0;const draw=()=>{el.innerHTML='<h5>🔔 Interrupt cycle — step by step</h5><div class="chain">'+S.map((s,k)=>`<span class="st ${k<i?'done':k==i?'now':''}">${s[0]}</span>`).join('')+'</div><div class="msg" dir="rtl"><b>الخطوة '+(i+1)+':</b> '+S[i][1]+'</div><button class="btn" data-a="p" '+(i==0?'disabled':'')+'>◀ Back</button><button class="btn" data-a="n" '+(i==S.length-1?'disabled':'')+'>Next ▶</button><button class="btn ghost" data-a="r">↺ Reset</button>'};
  draw();el.onclick=e=>{const a=e.target.dataset.a;if(!a)return;if(a=='n')i++;if(a=='p')i--;if(a=='r')i=0;draw()};
};
VIZ.io=el=>{
  el.innerHTML=`<h5>⏳ Synchronous vs Asynchronous I/O (timeline →)</h5>
  <div class="row"><span class="l">Synchronous</span><div class="bar" style="width:12%;background:#ff4fa3">I/O start</div><div class="bar" style="width:50%;background:repeating-linear-gradient(45deg,#c9a8ff,#c9a8ff 8px,#b58dff 8px,#b58dff 16px)">⏸ process WAITS</div><div class="bar" style="width:20%;background:#7b2ff7">continues</div></div>
  <div class="row"><span class="l">Asynchronous</span><div class="bar" style="width:12%;background:#ff4fa3">I/O start</div><div class="bar" style="width:50%;background:#e91e8c">▶ program keeps running</div><div class="bar" style="width:20%;background:#7b2ff7">🔔 done (interrupt/check)</div></div>
  <div class="row"><span class="l">DMA</span><div class="bar" style="width:12%;background:#ff4fa3">CPU sets up</div><div class="bar" style="width:50%;background:#9b5de5">Controller moves BLOCKS → memory (no CPU)</div><div class="bar" style="width:20%;background:#7b2ff7">🔔 one interrupt</div></div>
  <div class="msg" dir="rtl">في الـ sync الـ control بيرجع بعد ما الـ I/O يخلص. في الـ async بيرجع على طول. وفي الـ DMA الـ controller بينقل بلوك كامل للـ memory من غير ما يشغل الـ CPU.</div>`;
};
VIZ.layers6=el=>{
  const L=[['Layer 5: User programs','#ff4fa3','أعلى طبقة — برامج المستخدم.'],['Layer 4: Buffering for input and output','#e91e8c','تخزين مؤقت لعمليات الإدخال والإخراج.'],['Layer 3: Operator-console device driver','#d63ba0','الـ driver بتاع الـ console.'],['Layer 2: Memory management','#b565f0','إدارة الـ memory.'],['Layer 1: CPU scheduling','#7b2ff7','جدولة الـ CPU.'],['Layer 0: Hardware','#5f2eea','الأساس — كل طبقة بتستخدم اللي تحتها بس.']];
  el.innerHTML='<h5>🏗️ Layered structure of the first layered OS (click)</h5><div class="stack">'+L.map((l,i)=>`<div data-i="${i}" style="background:${l[1]}">${l[0]}</div>`).join('')+'</div><div class="msg" dir="rtl">دوس على طبقة... (كل طبقة تستخدم services الطبقات اللي <b>تحتها</b> بس)</div>';
  el.onclick=e=>{const d=e.target.closest('[data-i]');if(!d)return;el.querySelectorAll('.stack div').forEach(x=>x.classList.remove('on'));d.classList.add('on');$('.msg',el).innerHTML='<b>'+L[d.dataset.i][0]+'</b> — '+L[d.dataset.i][2]};
};
VIZ.state=el=>{
  const N={new:[70,50],ready:[190,175],running:[450,175],waiting:[320,295],terminated:[570,50]};
  const E=[['new','ready','admitted',[130,100],'الـ process اتعملت وبقت جاهزة (admitted).'],['ready','running','scheduler dispatch',[320,225],'الـ scheduler اختار الـ process وادّاها الـ CPU.'],['running','ready','interrupt',[320,125],'الـ time slice خلص أو جه interrupt — بترجع ready.'],['running','waiting','I/O or event wait',[450,285],'محتاجة I/O أو event — بتبقى waiting (blocked).'],['waiting','ready','I/O or event completion',[190,285],'الـ I/O خلص — بترجع ready (مش running مباشرة!).'],['running','terminated','exit',[550,135],'الـ process خلّصت شغلها وبتتشال.']];
  let cur='new',last=-1,msg='ابدأ: الـ process لسه New. اختار transition 👇';
  const tr=(p,q,d)=>{const dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1;return[p[0]+dx/l*d,p[1]+dy/l*d]};
  const draw=()=>{
    let s='<svg viewBox="0 0 640 340" width="100%" style="max-width:700px;display:block;margin:auto"><defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#7b2ff7"/></marker><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff4fa3"/></marker></defs>';
    E.forEach((e,k)=>{const a=N[e[0]],b=N[e[1]],c=e[3],p0=tr(a,c,44),p1=tr(b,c,48),hot=k==last;
      s+=`<path d="M${p0[0]} ${p0[1]} Q${c[0]} ${c[1]} ${p1[0]} ${p1[1]}" fill="none" stroke="${hot?'#ff4fa3':'#7b2ff7'}" stroke-width="${hot?4:2}" marker-end="url(#${hot?'ar2':'ar'})" opacity="${hot?1:.55}"/>`;
      const mx=.25*p0[0]+.5*c[0]+.25*p1[0],my=.25*p0[1]+.5*c[1]+.25*p1[1];
      s+=`<text x="${mx}" y="${my-4}" text-anchor="middle" font-size="11" font-weight="700" fill="${hot?'#e91e8c':'#5f2eea'}">${e[2]}</text>`});
    Object.entries(N).forEach(([k,p])=>{const on=k==cur;s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="48" ry="25" fill="${on?'url(#gg)':'#fff'}" stroke="${on?'#ff4fa3':'#a66bff'}" stroke-width="${on?4:2}"/><text x="${p[0]}" y="${p[1]+5}" text-anchor="middle" font-size="14" font-weight="800" fill="${on?'#fff':'#7b2ff7'}">${k}</text>`});
    s+='<defs><linearGradient id="gg"><stop offset="0" stop-color="#ff4fa3"/><stop offset="1" stop-color="#7b2ff7"/></linearGradient></defs></svg>';
    const opts=E.map((e,k)=>[e,k]).filter(x=>x[0][0]==cur);
    el.innerHTML='<h5>🚦 Process State Simulator — you are the OS!</h5>'+s+'<div class="msg" dir="rtl">'+msg+'</div><div>'+(opts.length?opts.map(x=>`<button class="btn" data-k="${x[1]}">${x[0][2]} → ${x[0][1]}</button>`).join(''):'<b>🏁 Terminated — انتهت الـ process.</b>')+'<button class="btn ghost" data-k="r">↺ Reset</button></div><div class="hint">الأزرار بتظهر فقط الـ transitions الصح من الحالة الحالية.</div>';
  };
  draw();el.onclick=e=>{const k=e.target.dataset.k;if(k===undefined)return;if(k=='r'){cur='new';last=-1;msg='ابدأ من جديد.'}else{const t=E[+k];cur=t[1];last=+k;msg='✔ <b>'+t[0]+' → '+t[1]+'</b> ('+t[2]+'): '+t[4]}draw()};
};
VIZ.sched=el=>{
  el.innerHTML=`<h5>📋 Schedulers & Queues</h5>
  <div class="chain" style="justify-content:center">
   <span class="st" style="background:#ffd6ea;color:#e91e8c">📚 Job pool</span>→
   <span class="st now">Long-term<br>(job scheduler)</span>→
   <span class="st" style="background:#e9dcff">Ready queue</span>→
   <span class="st now">Short-term<br>(CPU scheduler)</span>→
   <span class="st" style="background:#ffd6ea;color:#e91e8c">🧠 CPU</span>→
   <span class="st">end</span></div>
  <div class="chain" style="justify-content:center;margin-top:8px">
   <span class="st">CPU</span>↘ <span class="st" style="background:#e9dcff">I/O waiting queues</span>→ I/O →↖ <span class="st">Ready queue</span></div>
  <div class="chain" style="justify-content:center;margin-top:8px">
   <span class="st">CPU</span>⇄ <span class="st" style="background:#ffd6ea;color:#e91e8c">Medium-term: swap out / swap in</span> ⇄ <span class="st">Partially executed swapped-out processes</span></div>
  <table style="margin-top:12px"><tr><th></th><th>Long-term</th><th>Short-term</th></tr><tr><td><b>Also called</b></td><td>Job scheduler</td><td>CPU scheduler</td></tr><tr><td><b>Selects</b></td><td>Which processes enter the ready queue</td><td>Which process runs next</td></tr><tr><td><b>Frequency</b></td><td>Very infrequent (seconds/minutes)</td><td>Very frequent (milliseconds)</td></tr><tr><td><b>Speed</b></td><td>May be slow</td><td>Must be fast</td></tr><tr><td><b>Controls</b></td><td>Degree of multiprogramming</td><td>CPU allocation</td></tr></table>`;
};
VIZ.tree=el=>{
  const N={A:[300,30],B:[150,100],C:[300,100],D:[450,100],E:[90,175],F:[230,175],G:[370,175],H:[420,240],I:[470,300]};
  const E=[['A','B'],['A','C'],['A','D'],['B','E'],['C','F'],['C','G'],['G','H'],['H','I']];
  const draw=sel=>{
    let s='<svg viewBox="0 0 600 330" width="100%" style="max-width:640px;display:block;margin:auto">';
    E.forEach(e=>{const a=N[e[0]],b=N[e[1]];const hot=sel&&(e[0]==sel||e[1]==sel);s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${hot?'#ff4fa3':'#a66bff'}" stroke-width="${hot?4:2}"/>`});
    Object.entries(N).forEach(([k,p])=>{const par=E.find(e=>e[1]==k),ch=E.filter(e=>e[0]==k).map(e=>e[1]);const on=k==sel,rel=sel&&((par&&par[0]==sel)||ch.includes(sel));
      s+=`<g data-n="${k}" style="cursor:pointer"><circle cx="${p[0]}" cy="${p[1]}" r="22" fill="${on?'#ff4fa3':rel?'#e9dcff':'#fff'}" stroke="${on?'#7b2ff7':'#a66bff'}" stroke-width="3"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" font-weight="800" font-size="17" fill="${on?'#fff':'#7b2ff7'}">${k}</text></g>`});
    el.querySelector('.t').innerHTML=s+'</svg>';
  };
  el.innerHTML='<h5>🌳 Process tree (click a process)</h5><div class="t"></div><div class="msg" dir="rtl">دوس على أي process تعرف الأب والولاد بتوعها.</div>';
  draw();el.onclick=e=>{const g=e.target.closest('[data-n]');if(!g)return;const k=g.dataset.n,par=E.find(x=>x[1]==k),ch=E.filter(x=>x[0]==k).map(x=>x[1]);draw(k);$('.msg',el).innerHTML=`<b>${k}</b> — Parent: <b>${par?par[0]:'none (root)'}</b> · Children: <b>${ch.length?ch.join(', '):'none (leaf)'}</b><br>كل child له <b>parent واحد</b> بس، والـ parent ممكن يبقى له أكتر من child.`};
};
VIZ.threads=el=>{
  el.innerHTML=`<h5>🧵 One task, many threads</h5>
  <div class="box" style="background:#fff;border:3px solid #7b2ff7"><b>Task (process)</b>
   <div class="thr"><div style="background:#ffd6ea"><b>Shared</b><br>Code section</div><div style="background:#ffd6ea"><b>Shared</b><br>Data section</div><div style="background:#ffd6ea"><b>Shared</b><br>OS resources (files...)</div></div>
   <div class="thr"><div style="background:#e9dcff"><b>Thread 1</b><br>own PCB / registers / stack</div><div style="background:#e9dcff"><b>Thread 2</b><br>own PCB / registers / stack</div><div style="background:#e9dcff"><b>Thread 3</b><br>own PCB / registers / stack</div></div></div>
  <table><tr><th>Kind</th><th>Example in lecture</th><th>Note</th></tr><tr><td>Kernel-level</td><td>Mac and OS/2</td><td>kernel manages threads</td></tr><tr><td>User-level</td><td>Project Andrew (CMU)</td><td>thread library; drawback if kernel doesn't support threads</td></tr><tr><td>Hybrid</td><td>Solaris 2</td><td>both user-level and kernel-supported</td></tr></table>`;
};
VIZ.ipc=el=>{
  let mode='zero',q=[],sb=false,rb=false,pend=null,n=0,log='جرّب Send أو Receive.';
  const cap=()=>mode=='zero'?0:mode=='bounded'?3:Infinity;
  const draw=()=>{
    const slots=mode=='zero'?'<div class="slot" style="opacity:.4">no buffer</div>':(mode=='bounded'?[0,1,2].map(i=>`<div class="slot ${q[i]?'full':''}">${q[i]||''}</div>`).join(''):q.map(m=>`<div class="slot full">${m}</div>`).join('')+'<div class="slot">∞</div>');
    el.innerHTML=`<h5>📦 Buffering simulator</h5><div class="chips">${[['zero','Zero capacity'],['bounded','Bounded (n=3)'],['unbounded','Unbounded']].map(m=>`<button class="btn ${mode==m[0]?'':'ghost'}" data-m="${m[0]}">${m[1]}</button>`).join('')}</div>
    <div class="row" style="flex-wrap:wrap;justify-content:center"><div class="mini" style="cursor:default;text-align:center"><b>Sender P</b><br>${sb?'⛔ BLOCKED (waiting)':'✅ running'}</div><div style="flex:1;min-width:180px;text-align:center">→ link queue →<div class="slots" style="justify-content:center">${slots}</div></div><div class="mini" style="cursor:default;text-align:center"><b>Receiver Q</b><br>${rb?'⛔ BLOCKED (waiting)':'✅ running'}</div></div>
    <button class="btn" data-a="s">📤 send(msg)</button><button class="btn" data-a="r">📥 receive(msg)</button><button class="btn ghost" data-a="x">↺ Reset</button>
    <div class="msg" dir="rtl">${log}</div>`;
  };
  const reset=()=>{q=[];sb=false;rb=false;pend=null;n=0;log='جرّب Send أو Receive.'};
  draw();
  el.onclick=e=>{const m=e.target.dataset.m,a=e.target.dataset.a;
    if(m){mode=m;reset()}
    if(a=='x')reset();
    if(a=='s'){if(sb){log='⛔ الـ sender متبلوك أصلاً — لازم الـ receiver يستلم الأول.'}else{const msg='M'+(++n);
      if(rb){rb=false;log=`📤 ${msg} اتبعتت والـ receiver كان مستني ➜ استلمها وفك البلوك.`}
      else if(q.length<cap()){q.push(msg);log=`📤 ${msg} دخلت الـ queue والـ sender كمّل شغل (${mode=='unbounded'?'unbounded: عمره ما بيستنى':'في مكان فاضي'}).`}
      else{sb=true;pend=msg;log=mode=='zero'?'⛔ Zero capacity: مفيش buffer ➜ الـ sender لازم يستنى الـ receiver.':'⛔ الـ queue امتلت ➜ الـ sender بيستنى (bounded).'}}}
    if(a=='r'){if(rb){log='⛔ الـ receiver متبلوك أصلاً — لازم حد يبعت.'}
      else if(q.length){const m0=q.shift();log=`📥 الـ receiver استلم ${m0}.`;if(sb){q.push(pend);sb=false;log+=` والـ sender اتفك بلوكه وبعت ${pend}.`;pend=null}}
      else if(sb){log=`📥 استلم ${pend} مباشرة من الـ sender ➜ الـ sender اتفك.`;sb=false;pend=null}
      else{rb=true;log='⛔ مفيش رسالة ➜ الـ receiver بيستنى.'}}
    draw()};
};

/* ============ LECTURE 4 SIMULATORS ============ */
/* ============ LECTURE 4 helpers: Gantt + scheduler engine + visualizations ============ */
function ganttHTML(segs,cls){
  const total=segs.length?segs[segs.length-1][2]:0;
  const col=n=>n==='idle'?'#b9a7d8':PAL[((parseInt(String(n).replace(/\D/g,''),10)||1)-1)%PAL.length];
  return '<div class="gantt-wrap"><div class="gantt '+(cls||'')+'">'+segs.map(s=>`<div class="gseg" style="flex:${Math.max(1,s[2]-s[1])} 0 0;background:${col(s[0])}"><b>${s[0]}</b><i>${s[1]}</i></div>`).join('')+`<span class="gend">${total}</span></div></div>`;
}
function cpuSchedule(list,algo,q){
  const P=list.map((x,i)=>({n:x.n,a:+x.a||0,b:Math.max(0,+x.b||0),p:+x.p||0,rem:Math.max(0,+x.b||0),i,fin:null,st:null}));
  P.forEach(p=>{if(p.b===0){p.fin=p.a;p.st=p.a}});
  const segs=[];let t=0,guard=0;
  const add=(n,s,e,merge)=>{if(e<=s)return;const l=segs[segs.length-1];if(merge&&l&&l[0]===n&&l[2]===s)l[2]=e;else segs.push([n,s,e])};
  const left=()=>P.filter(p=>p.rem>0);
  const nextArr=()=>{const f=left().filter(p=>p.a>t);return f.length?Math.min(...f.map(p=>p.a)):Infinity};
  const mark=(p,s)=>{if(p.st===null)p.st=s};
  const key={fcfs:p=>[p.a,p.i],sjf:p=>[p.rem,p.a,p.i],prio:p=>[p.p,p.a,p.i],srtf:p=>[p.rem,p.a,p.i],prioP:p=>[p.p,p.a,p.i]};
  const cmp=f=>(x,y)=>{const A=f(x),B=f(y);for(let k=0;k<A.length;k++){if(A[k]!==B[k])return A[k]-B[k]}return 0};
  if(algo==='rr'){
    const qq=Math.max(1,+q||1),order=P.filter(p=>p.rem>0).sort(cmp(p=>[p.a,p.i])),queue=[];let k=0;
    const admit=()=>{while(k<order.length&&order[k].a<=t){queue.push(order[k]);k++}};
    admit();
    while((queue.length||k<order.length)&&guard++<10000){
      if(!queue.length){const na=order[k].a;add('idle',t,na,false);t=na;admit();continue}
      const p=queue.shift(),run=Math.min(qq,p.rem);mark(p,t);add(p.n,t,t+run,false);t+=run;p.rem-=run;admit();
      if(p.rem>0)queue.push(p);else p.fin=t;
    }
  }else if(algo==='srtf'||algo==='prioP'){
    const f=key[algo];let cur=null;
    while(left().length&&guard++<10000){
      const ready=left().filter(p=>p.a<=t);
      if(!ready.length){const na=nextArr();add('idle',t,na,true);t=na;continue}
      ready.sort(cmp(f));let pick=ready[0];
      if(cur&&cur.rem>0&&cur.a<=t&&f(cur)[0]===f(pick)[0])pick=cur;
      const end=Math.min(t+pick.rem,nextArr());
      mark(pick,t);add(pick.n,t,end,true);pick.rem-=end-t;t=end;cur=pick;if(pick.rem===0)pick.fin=t;
    }
  }else{
    const f=key[algo]||key.fcfs;
    while(left().length&&guard++<10000){
      const ready=left().filter(p=>p.a<=t);
      if(!ready.length){const na=nextArr();add('idle',t,na,false);t=na;continue}
      ready.sort(cmp(f));const p=ready[0];mark(p,t);add(p.n,t,t+p.rem,false);t+=p.rem;p.rem=0;p.fin=t;
    }
  }
  const stats=P.map(p=>({n:p.n,a:p.a,b:p.b,fin:p.fin,ta:p.fin-p.a,w:p.fin-p.a-p.b,r:p.st-p.a}));
  const run=segs.filter(s=>s[0]!=='idle');let cs=0;for(let i=1;i<run.length;i++)if(run[i][0]!==run[i-1][0])cs++;
  const avg=k=>stats.length?stats.reduce((s,x)=>s+x[k],0)/stats.length:0;
  return{segs,stats,cs,avgW:avg('w'),avgT:avg('ta'),avgR:avg('r')};
}
const fmtN=x=>{const r=Math.round(x*100)/100;return String(r)};
const SIM_PRESETS={
  fcfs1:{label:'FCFS · P1,P2,P3 = 24,3,3',algo:'fcfs',q:4,rows:[['P1',0,24,0],['P2',0,3,0],['P3',0,3,0]]},
  fcfs2:{label:'FCFS · order P2,P3,P1',algo:'fcfs',q:4,rows:[['P2',0,3,0],['P3',0,3,0],['P1',0,24,0]]},
  rr:{label:'RR q=20 · 53,17,68,24',algo:'rr',q:20,rows:[['P1',0,53,0],['P2',0,17,0],['P3',0,68,0],['P4',0,24,0]]},
  sjf:{label:'SJF (non-preemptive)',algo:'sjf',q:4,rows:[['P1',0,7,0],['P2',2,4,0],['P3',4,1,0],['P4',5,4,0]]},
  srtf:{label:'SRTF (preemptive SJF)',algo:'srtf',q:4,rows:[['P1',0,7,0],['P2',2,4,0],['P3',4,1,0],['P4',5,4,0]]},
  prio:{label:'Priority · practice',algo:'prio',q:4,rows:[['P1',0,10,3],['P2',0,1,1],['P3',0,2,4],['P4',0,1,5],['P5',0,5,2]]}
};
const SIM_ALGOS=[['fcfs','FCFS'],['sjf','SJF (non-preemptive)'],['srtf','SRTF (preemptive SJF)'],['rr','Round Robin'],['prio','Priority (non-preemptive)'],['prioP','Priority (preemptive)']];
VIZ.cpusim=el=>{
  let S=JSON.parse(JSON.stringify(SIM_PRESETS.fcfs1)),timers=[];
  const rowsHTML=()=>S.rows.map((r,i)=>`<tr><td><input class="sim-n" data-i="${i}" data-f="0" value="${esc(r[0])}" size="3"></td><td><input type="number" min="0" data-i="${i}" data-f="1" value="${r[1]}"></td><td><input type="number" min="0" data-i="${i}" data-f="2" value="${r[2]}"></td><td><input type="number" data-i="${i}" data-f="3" value="${r[3]}"></td><td><button class="btn ghost sim-x" data-x="${i}" title="remove">✕</button></td></tr>`).join('');
  const shell=()=>{el.innerHTML=`<h5>🧪 CPU Scheduling Simulator — choose a preset from the lecture or type your own numbers</h5>
  <div class="sim-presets">${Object.entries(SIM_PRESETS).map(([k,v])=>`<button class="btn ghost" data-p="${k}">${v.label}</button>`).join('')}</div>
  <div class="sim-ctrl"><label>Algorithm <select class="sim-algo">${SIM_ALGOS.map(a=>`<option value="${a[0]}" ${a[0]==S.algo?'selected':''}>${a[1]}</option>`).join('')}</select></label>
  <label class="sim-qw" ${S.algo=='rr'?'':'style="display:none"'}>Quantum <input type="number" min="1" class="sim-q" value="${S.q}"></label>
  <button class="btn" data-a="anim">▶ Animate</button></div>
  <table class="sim-t"><thead><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Priority<br><small>(small = high)</small></th><th></th></tr></thead><tbody>${rowsHTML()}</tbody></table>
  <button class="btn ghost" data-a="add">＋ Add process</button>
  <div class="sim-out"></div>`;run()};
  const run=()=>{
    const out=$('.sim-out',el);if(!out)return;
    const list=S.rows.map(r=>({n:r[0]||'P',a:r[1],b:r[2],p:r[3]}));
    if(!list.length){out.innerHTML='<div class="msg" dir="rtl">ضيف process الأول.</div>';return}
    const R=cpuSchedule(list,S.algo,S.q);
    const ws=R.stats.map(s=>s.w),ts=R.stats.map(s=>s.ta);
    out.innerHTML=`<div class="sim-gantt">${ganttHTML(R.segs)}</div>
    <table class="sim-t res"><thead><tr><th>Process</th><th>Waiting</th><th>Turnaround</th><th>Response</th></tr></thead><tbody>${R.stats.map(s=>`<tr><td><b>${esc(s.n)}</b></td><td>${s.w}</td><td>${s.ta}</td><td>${s.r}</td></tr>`).join('')}<tr class="avg"><td>Average</td><td><b>${fmtN(R.avgW)}</b></td><td><b>${fmtN(R.avgT)}</b></td><td><b>${fmtN(R.avgR)}</b></td></tr></tbody></table>
    <div class="msg" dir="ltr">Average waiting = (${ws.join(' + ')}) / ${ws.length} = <b>${fmtN(R.avgW)}</b> &nbsp;·&nbsp; Context switches: <b>${R.cs}</b></div>`;
  };
  shell();
  el.addEventListener('click',e=>{
    const p=e.target.closest('[data-p]'),x=e.target.closest('[data-x]'),a=e.target.closest('[data-a]');
    if(p){S=JSON.parse(JSON.stringify(SIM_PRESETS[p.dataset.p]));shell()}
    else if(x){S.rows.splice(+x.dataset.x,1);shell()}
    else if(a&&a.dataset.a=='add'){S.rows.push(['P'+(S.rows.length+1),0,5,S.rows.length+1]);shell()}
    else if(a&&a.dataset.a=='anim'){
      timers.forEach(clearTimeout);timers=[];run();
      const segs=[...el.querySelectorAll('.sim-gantt .gseg')];
      segs.forEach(s=>{s.style.opacity='0';s.style.transform='scaleY(.2)'});
      segs.forEach((s,k)=>timers.push(setTimeout(()=>{s.style.opacity='1';s.style.transform='none'},350*(k+1))));
    }
  });
  el.addEventListener('input',e=>{
    const t=e.target;
    if(t.dataset&&t.dataset.i!==undefined){const f=+t.dataset.f;S.rows[+t.dataset.i][f]=f===0?t.value:(t.value===''?0:+t.value);run()}
    else if(t.classList.contains('sim-q')){S.q=Math.max(1,+t.value||1);run()}
  });
  el.addEventListener('change',e=>{
    if(e.target.classList.contains('sim-algo')){S.algo=e.target.value;$('.sim-qw',el).style.display=S.algo=='rr'?'':'none';run()}
  });
};
VIZ.burst=el=>{
  const bins=[150,34,7,5,5,4,4,3,3,3,3,2,2,2,2,2,2,2,2,2];
  const W=560,H=230,L=46,B=34,bw=(W-L-12)/bins.length,my=160;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:640px;display:block;margin:auto"><text x="8" y="14" font-size="12" fill="#7b2ff7" font-weight="700">frequency</text>`;
  [0,40,80,120,160].forEach(v=>{const y=H-B-(v/my)*(H-B-24);s+=`<line x1="${L}" x2="${W-6}" y1="${y}" y2="${y}" stroke="#e9dcff"/><text x="${L-6}" y="${y+4}" font-size="11" text-anchor="end" fill="#5f2eea">${v}</text>`});
  bins.forEach((v,i)=>{const h=(Math.min(v,my)/my)*(H-B-24),x=L+i*bw+2,y=H-B-h;s+=`<rect data-b="${i}" x="${x}" y="${y}" width="${bw-4}" height="${h}" rx="3" fill="${i==0?'#ff4fa3':'#a66bff'}" style="cursor:pointer"/>`});
  [0,8,16,24,32,40].forEach(v=>{const x=L+(v/2)*bw;s+=`<text x="${x}" y="${H-16}" font-size="11" text-anchor="middle" fill="#5f2eea">${v}</text>`});
  s+=`<text x="${W/2}" y="${H-2}" font-size="12" text-anchor="middle" fill="#7b2ff7" font-weight="700">burst duration (milliseconds)</text></svg>`;
  el.innerHTML='<h5>📊 Histogram of CPU-burst times (illustrative shape from the lecture — click a bar)</h5>'+s+
  '<h5 style="margin-top:14px">🔁 Sequence of CPU and I/O bursts</h5><div class="chain">'+['CPU burst','I/O burst','CPU burst','I/O burst','CPU burst','I/O burst','…'].map((x,i)=>`<span class="st ${i%2?'':'now'}">${x}</span>`).join('→')+'</div><div class="msg" dir="rtl">دوس على عمود في الرسمة. الـ cycle بتبدأ بـ <b>CPU burst</b>.</div>';
  el.onclick=e=>{const r=e.target.closest('[data-b]');if(!r)return;const i=+r.dataset.b;$('.msg',el).innerHTML=i==0?'<b>الأعمدة الأولى (bursts قصيرة جداً)</b> هي الأكتر تكراراً بفارق كبير — <b>several short bursts</b>.':i<3?'الرسم بينزل بسرعة جداً — شكل <b>exponential</b>.':'الـ bursts الطويلة نادرة جداً — <b>a few longer bursts</b>.'};
};
VIZ.levels=el=>{
  const B=['Jobs waiting for entry','Jobs waiting for initiation','Suspended process waiting for activation','Active processes','Running processes','Completed'];
  const T=[['job entry',null],['job initiation','H'],['activate ⇅ suspend','I'],['dispatch ⇅ block or time-out','L'],['complete',null]];
  const LV={H:['High-level scheduling','#ff4fa3','Job / admission scheduling: بيحدد أنهي job تدخل النظام. بعد ما تدخل بتتحول لـ process أو مجموعة processes.'],I:['Intermediate-level scheduling','#7b2ff7','بيحدد أنهي processes تتنافس على الـ CPU، وبيعمل suspend و resume للتجاوب مع التقلبات القصيرة. بيشتغل كـ buffer بين دخول الـ jobs وإعطائها الـ CPU.'],L:['Low-level scheduling','#e91e8c','بيحدد أنهي process ياخد الـ CPU لما يفضى (dispatch). بيتنفذ بالـ dispatcher اللي بيشتغل مرات كتير في الثانية وموجود دايماً في الـ primary storage. Dispatch latency = وقت إيقاف process وبدء تانية.']};
  let sel=null;
  const draw=()=>{
    el.innerHTML='<h5>🪜 Scheduling Levels — click a level or a transition</h5><div class="chips">'+Object.entries(LV).map(([k,v])=>`<button class="btn ${sel==k?'':'ghost'}" data-l="${k}">${k}.L. — ${v[0].split('-')[0]}</button>`).join('')+'</div><div class="lv">'+B.map((b,i)=>{
      const t=T[i];return `<div class="lvbox">${esc(b)}</div>`+(t?`<div class="lvarr ${t[1]&&sel==t[1]?'on':''}" ${t[1]?`data-l="${t[1]}" style="${sel==t[1]?'background:'+LV[t[1]][1]:''}"`:''}>↓ ${t[0]}${t[1]?` <em>${t[1]}.L.</em>`:''}</div>`:'')}).join('')+'</div><div class="msg" dir="rtl">'+(sel?`<b>${LV[sel][0]}</b> — ${LV[sel][2]}`:'اختار مستوى (H.L. / I.L. / L.L.) أو دوس على سهم.')+'</div>';
  };
  draw();el.onclick=e=>{const l=e.target.closest('[data-l]');if(!l)return;sel=sel==l.dataset.l?null:l.dataset.l;draw()};
};
VIZ.mlfq=el=>{
  let b=30;
  const out=()=>{
    const a0=Math.min(8,b),r1=b-a0,a1=Math.min(16,r1),r2=r1-a1,a2=r2;
    const fin=r1<=0?'Q0':r2<=0?'Q1':'Q2';
    const card=(n,title,used,max,on)=>`<div class="mini" style="cursor:default;border-color:${on?'#ff4fa3':'#d9c7ff'};opacity:${used>0?1:.45}"><b>${n}</b> — ${title}<div style="height:14px;background:#e9dcff;border-radius:99px;margin:8px 0;overflow:hidden"><i style="display:block;height:100%;width:${max?Math.min(100,used/max*100):(used?100:0)}%;background:linear-gradient(90deg,#ff4fa3,#7b2ff7)"></i></div>${used>0?`gets <b>${used} ms</b>`:'not reached'}${fin==n?' · ✅ finishes here':''}</div>`;
    $('.mf-out',el).innerHTML=`<div class="grid">${card('Q0','quantum 8 ms',a0,8,fin=='Q0')}${card('Q1','quantum 16 ms',a1,16,fin=='Q1')}${card('Q2','FCFS (until done)',a2,0,fin=='Q2')}</div>
    <div class="msg" dir="rtl">الـ job دخلت <b>Q0</b> وخدت ${a0} ms${r1>0?` وماخلصتش (فاضل ${r1}) ← اتنقلت لـ <b>Q1</b> وخدت ${a1} ms`:' وخلّصت هناك'}${r1>0&&r2>0?` وماخلصتش (فاضل ${r2}) ← اتعملها preempt واتنقلت لـ <b>Q2</b> (FCFS) وخلّصت فيه`:r1>0?' وخلّصت هناك':''}.</div>`;
  };
  el.innerHTML=`<h5>🛗 Multilevel Feedback Queue — pick the job's total CPU burst</h5>
    <div class="sim-ctrl"><label>Burst (ms) <input type="range" min="1" max="60" value="${b}" class="mf-r"> <input type="number" min="1" max="200" value="${b}" class="mf-n"></label>${[5,8,20,24,40].map(v=>`<button class="btn ghost" data-v="${v}">${v}</button>`).join('')}</div><div class="mf-out"></div>`;
  out();
  el.addEventListener('input',e=>{const c=e.target.classList;if(c.contains('mf-r')||c.contains('mf-n')){b=Math.max(1,+e.target.value||1);const o=c.contains('mf-r')?$('.mf-n',el):$('.mf-r',el);if(o)o.value=b;out()}});
  el.addEventListener('click',e=>{const v=e.target.closest('[data-v]');if(v){b=+v.dataset.v;$('.mf-r',el).value=b;$('.mf-n',el).value=b;out()}});
};
const CHEAT4=`
<div class="topic"><h3><span class="ico">⏱️</span>Lecture 4 — CPU Scheduling <small>جداول المقارنة</small></h3>
<table><tr><th>Algorithm</th><th>Preemptive?</th><th>Key idea</th><th>Lecture note / problem</th></tr>
<tr><td>FCFS</td><td>No</td><td>By arrival time</td><td>Short jobs wait for long ones; poor response time</td></tr>
<tr><td>RR</td><td>Yes (quantum)</td><td>Each process gets a time slice (10–100 ms)</td><td>No wait &gt; (n−1)q; q large → FIFO; q small → overhead</td></tr>
<tr><td>SJF</td><td>No</td><td>Smallest run-time-to-completion first</td><td>Optimal (min avg waiting)</td></tr>
<tr><td>SRTF</td><td>Yes</td><td>Preempt if new burst &lt; remaining time</td><td>Preemptive SJF</td></tr>
<tr><td>Priority</td><td>Either</td><td>Smallest integer = highest priority</td><td>Starvation → Aging</td></tr>
<tr><td>Multilevel queue</td><td>—</td><td>Foreground (RR) + background (FCFS)</td><td>Fixed priority (starvation) or time slice (80/20)</td></tr>
<tr><td>Multilevel feedback</td><td>Yes</td><td>Processes move between queues</td><td>Q0 = 8 ms → Q1 = 16 ms → Q2 = FCFS</td></tr></table>
<table><tr><th>Scheduling level</th><th>Also called</th><th>Job</th></tr><tr><td>High-level</td><td>Job / admission</td><td>Which job enters the system</td></tr><tr><td>Intermediate</td><td>—</td><td>Suspend / resume; buffer</td></tr><tr><td>Low-level</td><td>Dispatcher</td><td>Which process gets the CPU next</td></tr></table>
<table><tr><th>Static priority</th><th>Dynamic priority</th></tr><tr><td>Can’t be changed</td><td>Can be changed, even after a short duration</td></tr><tr><td>Easy to implement</td><td>Complex to implement</td></tr><tr><td>No response to external changes</td><td>Responsive to external changes</td></tr></table>
<table><tr><th>Nonpreemptive</th><th>Preemptive</th></tr><tr><td>CPU can’t be taken away</td><td>CPU can be taken away</td></tr><tr><td>Short jobs wait for long jobs; fair</td><td>Useful for high-priority processes</td></tr><tr><td>Response time more predictable</td><td>Needs many processes in memory</td></tr></table>
<table><tr><th>Self-scheduling</th><th>Master-slave</th></tr><tr><td>A queue for each processor</td><td>Common ready queue accessed by one processor</td></tr><tr><td>Symmetric multiprocessing</td><td>Asymmetric multiprocessing</td></tr></table>
<table><tr><th>Worked examples</th><th>Result</th></tr><tr><td>FCFS: P1=24,P2=3,P3=3 (order P1,P2,P3)</td><td>avg waiting = 17</td></tr><tr><td>FCFS: same, order P2,P3,P1</td><td>avg waiting = 3</td></tr><tr><td>SJF non-preemptive: P1(0,7) P2(2,4) P3(4,1) P4(5,4)</td><td>avg waiting = 4</td></tr><tr><td>SRTF: same processes</td><td>avg waiting = 3</td></tr><tr><td>RR q=20: 53,17,68,24</td><td>ends at 162; P2 finishes at 37</td></tr></table>
<div class="grid"><div class="mini open"><b>5</b> criteria · <b>8</b> algorithms · <b>3</b> scheduling levels</div><div class="mini open"><b>2</b> ways between multilevel queues · <b>5</b> MLFQ parameters</div></div></div>`;

/* ============ CHEATSHEET + FLASHCARDS ============ */
const CHEAT=`
<div class="topic"><h3><span class="ico">🆚</span>Comparison Tables <small>جداول المقارنة</small></h3>
<table><tr><th>Synchronous I/O</th><th>Asynchronous I/O</th></tr><tr><td>Control returns only after I/O completes</td><td>Control returns without waiting</td></tr><tr><td>Process waits</td><td>Process keeps running; checks status/interrupt</td></tr></table>
<table><tr><th>Direct communication</th><th>Indirect communication</th></tr><tr><td>Name each other: send(P,msg)</td><td>Mailboxes (ports) with unique ID</td></tr><tr><td>Exactly one link per pair</td><td>Several links per pair possible</td></tr><tr><td>Link ↔ exactly one pair</td><td>Link may involve many processes</td></tr><tr><td>Established automatically</td><td>Only if share a mailbox</td></tr></table>
<table><tr><th>Process (heavyweight)</th><th>Thread (lightweight)</th></tr><tr><td>Task with one thread</td><td>Basic unit of CPU use; own PCB</td></tr><tr><td>Own code/data/resources</td><td>Shares code, data, OS resources with peers</td></tr></table>
<table><tr><th>I/O-bound</th><th>CPU-bound</th></tr><tr><td>More I/O than computation</td><td>More computation</td></tr><tr><td>Many short CPU bursts (Scanner)</td><td>Few very long CPU bursts (Calculator)</td></tr></table>
<table><tr><th>Hard real-time</th><th>Soft real-time</th></tr><tr><td>Secondary storage limited/absent</td><td>Multimedia, virtual reality</td></tr><tr><td>Not supported by general-purpose OS</td><td>Needs advanced OS features</td></tr><tr><td>Conflicts with time-sharing</td><td>Less strict deadlines</td></tr></table>
<table><tr><th>Batch</th><th>Multi-programmed</th><th>Time-sharing</th></tr><tr><td>One job at a time</td><td>Several programs in memory</td><td>Switches fast between jobs</td></tr><tr><td>Groups/batches</td><td>CPU used while another waits for I/O</td><td>Interactive, low response time</td></tr></table>
<table><tr><th>Mechanism</th><th>Policy</th></tr><tr><td>HOW to do something</td><td>WHAT will be done</td></tr></table>
</div>
<div class="topic"><h3><span class="ico">🔢</span>Numbers to remember <small>أرقام للحفظ</small></h3>
<div class="grid">
<div class="mini open"><b>8</b> objectives · <b>7</b> services · <b>6</b> network functions</div>
<div class="mini open"><b>8</b> system components · <b>8</b> types of systems</div>
<div class="mini open"><b>3</b> parameter-passing methods · <b>4</b> interrupt classes</div>
<div class="mini open"><b>6</b> layers in first layered OS · <b>7</b> storage levels</div>
<div class="mini open"><b>5</b> process states · <b>6</b> transitions · <b>6</b> PCB items</div>
<div class="mini open"><b>3</b> schedulers · <b>3</b> buffering types</div>
</div></div>`;
const FLASH=[['OS?','Software that controls & manages hardware, resource allocator. بيتحكم ويوزّع الموارد.'],['Kernel responsibilities','Memory allocation, garbage collection, object finalization, module termination, interfacing/clock.'],['Trap','Software-generated interrupt (error or user request). interrupt من software.'],['Interrupt vector','Table of addresses of all ISRs. جدول عناوين الـ ISRs.'],['DMA','Controller transfers blocks to memory without CPU. نقل بلوكات بدون CPU.'],['Mechanism vs Policy','Mechanism = HOW, Policy = WHAT.'],['Layered approach','Layer 0 = hardware … layer N = UI; each uses lower layers only.'],['VM advantage','Complete protection + great for OS development. حماية كاملة.'],['Process','Program in execution. برنامج شغّال.'],['Waiting → ?','Ready (not running). بيرجع ready مش running.'],['PCB','Process descriptor: state, ID, parent, child, resources, scheduling info.'],['Long-term scheduler','Job scheduler; rare; controls degree of multiprogramming.'],['Thread shares','Code, data, OS resources (task). بيتشاركوا code و data و resources.'],['Zero capacity','0 messages; sender must wait for receiver.'],['Unbounded capacity','Infinite queue; sender never waits.'],['Midrange computers →','Desktop & Real-time systems.'],
['CPU scheduling goal','Maximize CPU utilization. الـ CPU ميقعدش فاضي.'],['Preemptive vs Nonpreemptive','Preemptive: CPU can be taken away. Nonpreemptive: once a process has the CPU it can’t be taken.'],['Dispatch latency','Time for the dispatcher to stop one process and start another.'],['5 scheduling criteria','CPU utilization · Throughput · Turnaround · Waiting · Response. (Max, Max, Min, Min, Min)'],['Response time','From submission until the FIRST response (not output).'],['FCFS example','P1=24,P2=3,P3=3 → avg waiting 17. Order P2,P3,P1 → avg 3.'],['RR waiting bound','No process waits more than (n−1)q.'],['RR: q large / small','q large → FIFO. q small → more context switches (overhead).'],['SJF','Optimal: minimum average waiting time. Preemptive version = SRTF.'],['SJF vs SRTF example','Non-preemptive avg waiting = 4 · SRTF avg waiting = 3.'],['Priority scheduling problem/solution','Starvation → Aging. Smallest integer = highest priority.'],['Multilevel queue','Foreground = RR, background = FCFS. Between queues: fixed priority or time slice (80/20).'],['MLFQ example','Q0 quantum 8 ms → Q1 quantum 16 ms → Q2 FCFS.'],['Self-scheduling','A queue for each processor = Symmetric multiprocessing.'],['Master-Slave','Common ready queue = Asymmetric multiprocessing.'],['Hard vs Soft RT scheduling','Hard: exact times + resource reservation (rejected if unavailable). Soft: priority + small dispatch latency via preemption.']];

/* ============ QUESTION BANKS ============ */
const M=[
[1,"Which of the following is NOT an objective of an operating system?",["Convenience","Efficiency","Maximizing hardware cost","Protection"],2,"الـ OS هدفه الكفاءة والراحة والحماية — مش بيزوّد تكلفة الـ hardware."],
[1,"The OS acting as a 'resource allocator' means it:",["Writes programs for users","Distributes CPU, memory and I/O among programs","Only controls the keyboard","Replaces the hardware"],1,"Resource allocator = بيوزّع الموارد (CPU, memory, I/O) على البرامج."],
[1,"Which storage level is the fastest and most expensive?",["Cache","Registers","Main memory","Magnetic tape"],1,"فوق الهرم: registers (أسرع وأغلى)."],
[1,"Which of these storage devices is volatile?",["Magnetic tape","Optical disk","Cache","Magnetic disk"],2,"الـ cache (زي registers والـ main memory) volatile. الباقي non-volatile."],
[1,"Which system runs only one job at a time and receives programs/data in groups?",["Time-sharing","Simple batch","Parallel","Handheld"],1,"Simple batch = one job at a time + submitted in batches."],
[1,"In a multi-programmed batch system, when one job waits for I/O:",["The CPU stays idle","The system shuts down","Another job can use the CPU","All jobs are deleted"],2,"ده بالظبط سبب وجود multiprogramming: استغلال الـ CPU."],
[1,"The main goal of a time-sharing system is:",["Low response time for interactive users","Meeting hard deadlines","Running only on pagers","Using a single CPU only"],0,"Time-sharing = interactive + low response time."],
[1,"Which statement about HARD real-time systems is TRUE?",["Fully supported by general-purpose OS","Secondary storage is limited or absent","Used mainly for multimedia","They have no time constraints"],1,"Hard RT: secondary storage limited/absent، ومش مدعومة في general-purpose OS."],
[1,"Supercomputers correspond to which system types?",["Handheld","Desktop","Parallel & distributed","Batch only"],2,"Super → Parallel & Distributed."],
[1,"In the layers of a computer system, which layer is directly above the hardware?",["Utilities","Application programs","Operating system","End user"],2,"من تحت لفوق: Hardware → OS → Utilities → Applications → End user."],
[1,"Each device controller has:",["No memory","A local buffer","A copy of main memory","A CPU scheduler"],1,"كل controller ليه local buffer."],
[1,"Mainframe computers correspond to:",["Handheld systems","Batch & time-share (hybrid)","Parallel only","Real-time only"],1,"Mainframe → Batch & Time-share (Hybrid)."],
[1,"Which is a feature of Peer-to-Peer systems?",["One central server provides all services","Decentralized computers provide services to peers","No network at all","Only one computer"],1,"Peer-to-peer = decentralized."],
[2,"A trap is:",["A hardware failure","A software-generated interrupt","A timer only","A kind of disk"],1,"Trap = software-generated interrupt (error أو user request)."],
[2,"The interrupt vector contains:",["The CPU state","Addresses of all service routines","User passwords","Disk blocks"],1,"Interrupt vector = جدول عناوين الـ ISRs."],
[2,"Why are interrupts disabled while another interrupt is being processed (basic approach)?",["To prevent a lost interrupt","To save memory","To speed up the disk","To delete the ISR"],0,"حسب المحاضرة: لمنع lost interrupt."],
[2,"In asynchronous I/O, after I/O starts:",["Control returns only when I/O completes","Control returns to the program without waiting","The system reboots","The CPU is disabled"],1,"Async = ما بيستناش."],
[2,"DMA is used to:",["Transfer blocks from device buffer to memory without CPU intervention","Increase the CPU clock","Encrypt files","Disable interrupts"],0,"DMA = نقل بلوكات بدون تدخل CPU."],
[2,"Which is NOT a method to pass parameters to the OS in a system call?",["In registers","Table in memory","On the stack","Through the hard disk"],3,"الطرق: registers / table / stack."],
[2,"MS-DOS system structure is best described as:",["Strictly layered","Not divided into modules; interfaces not well separated","A virtual machine","Fully distributed"],1,"MS-DOS: أقصى functionality في أقل space ومش modular."],
[2,"In the layered approach, layer N is:",["The hardware","The user interface","The CPU scheduler","The memory manager"],1,"Layer 0 = hardware و Layer N = user interface."],
[2,"Which is an ADVANTAGE of virtual machines?",["Direct resource sharing","Complete protection between VMs","Easy to implement","Needs no hardware"],1,"الـ isolation بيدّي حماية كاملة (لكن بيمنع الـ sharing)."],
[2,"'Mechanisms determine ______ while policies decide ______.'",["what / how","how / what","who / when","where / why"],1,"Mechanism = How، Policy = What."],
[2,"In UNIX, the program that reads and interprets control statements is called:",["Kernel","Shell","Loader","Driver"],1,"الـ shell = command-line interpreter."],
[2,"In the first layered OS, layer 1 is:",["User programs","Memory management","CPU scheduling","Hardware"],2,"Layer 2 memory management، Layer 1 CPU scheduling."],
[2,"Which is NOT a class of interrupts in the lecture?",["Program","Timer","I/O","Compiler"],3,"Classes: Program, Timer, I/O, Hardware failure."],
[2,"Writing an OS in a high-level language makes it easier to:",["Port to other hardware","Run faster than assembly always","Avoid system calls","Remove the kernel"],0,"High-level = faster to write, compact, easier to debug and port."],
[2,"A device controller informs the CPU that it has finished by:",["Deleting its buffer","Causing an interrupt","Rebooting","Calling the shell"],1,"بيعمل interrupt."],
[3,"A process is best defined as:",["A file on disk","A program in execution","A kind of memory","A hardware device"],1,"Process = program in execution."],
[3,"A process waiting for I/O completion is in which state?",["New","Ready","Waiting (blocked)","Terminated"],2,"Waiting/blocked."],
[3,"Which is NOT stored in a PCB?",["Process state","Unique identification","Pointer to parent","Monitor resolution"],3,"PCB: state, ID, parent, child, resources, scheduling info."],
[3,"The long-term scheduler:",["Runs every millisecond","Selects which processes are brought into the ready queue","Allocates the CPU","Swaps pages"],1,"Long-term = job scheduler، بيتحكم في degree of multiprogramming."],
[3,"The short-term scheduler is invoked:",["Very frequently (milliseconds)","Once a day","Only at boot","Never"],0,"Short-term لازم يبقى سريع."],
[3,"An I/O-bound process typically has:",["Few very long CPU bursts","Many short CPU bursts","No I/O","No CPU use"],1,"I/O-bound = bursts كتير وقصيرة."],
[3,"In the process tree, each child has:",["Exactly one parent","Many parents","No parent","Two parents"],0,"كل child له parent واحد."],
[3,"Peer threads of the same task share:",["Code, data and OS resources","Only registers","Only the stack","Nothing"],0,"بيشاركوا code + data + OS resources."],
[3,"A traditional (heavyweight) process is equal to:",["A task with one thread","Many tasks","A mailbox","A kernel"],0,"Heavyweight = task بـ thread واحدة."],
[3,"In direct communication, processes:",["Share a mailbox","Name each other explicitly","Cannot communicate","Use only shared variables"],1,"send(P,msg) / receive(Q,msg)."],
[3,"In indirect communication, messages are sent to:",["Mailboxes (ports)","Registers","The BIOS","The shell"],0,"Mailboxes/ports بـ unique ID."],
[3,"Zero-capacity buffering means:",["The sender never waits","The sender must wait for the receiver","Infinite queue","n messages queue"],1,"0 messages ➜ sender waits."],
[3,"Which buffering type never makes the sender wait?",["Zero capacity","Bounded capacity","Unbounded capacity","None"],2,"Unbounded = infinite length."],
[3,"The transition running → ready is caused by:",["Admitted","Interrupt","Exit","I/O completion"],1,"Interrupt (مثلاً انتهاء الـ time slice)."],
[3,"The transition ready → running is called:",["Scheduler dispatch","Admitted","Exit","Event wait"],0,"Scheduler dispatch."],
[3,"Which scheduler is invoked very infrequently?",["Short-term","Long-term","Both equally","None"],1,"Long-term (seconds/minutes)."]
,
[4,"What is the main goal of CPU scheduling?",["Minimize CPU utilization","Maximize CPU utilization","Maximize waiting time","Increase the number of I/O bursts"],1,"الهدف الأساسي: maximize CPU utilization."],
[4,"The process execution cycle begins with a:",["CPU burst","I/O burst","Context switch","Dispatch"],0,"الدورة بتبدأ بـ CPU burst، والـ I/O cycle بتبدأ بـ I/O burst."],
[4,"The frequency graph of CPU bursts is characterized as:",["Linear","Uniform","Exponential or hyper exponential","Constant"],2,"أغلب الـ bursts قصيرة وقليل طويل ← exponential / hyper exponential."],
[4,"In a nonpreemptive scheduling discipline:",["The CPU can be taken from a running process","Once a process has the CPU, it can’t be taken away","Only high-priority processes run","Context switches happen every quantum"],1,"Nonpreemptive = once a process has the CPU, CPU can’t be taken from it."],
[4,"Preemptive scheduling is most useful when:",["All jobs are equal","High-priority processes require rapid attention","There is only one process","No memory is available"],1,"الـ preemptive مفيد للـ high-priority processes اللي محتاجة rapid attention."],
[4,"Which statement about nonpreemptive systems is TRUE?",["Short jobs never wait","Response time is more predictable","High-priority jobs can displace waiting jobs","They need many processes in memory"],1,"في الـ nonpreemptive الـ response time أكتر توقعاً لأن شغلانات high-priority الجديدة مش بتزيح اللي مستنيين."],
[4,"High-level scheduling is also called:",["Dispatching","Job (admission) scheduling","Swapping","Quantum scheduling"],1,"High-level = job scheduling أو admission scheduling."],
[4,"Which level is performed by the dispatcher?",["High-level","Intermediate-level","Low-level","All levels"],2,"الـ dispatcher = Low-level scheduling."],
[4,"Dispatch latency is:",["The time a process waits in the ready queue","The time the dispatcher takes to stop one process and start another","The total execution time of a process","The size of the quantum"],1,"Dispatch latency = وقت إيقاف process وبدء تانية."],
[4,"Intermediate-level scheduling responds to short-term fluctuations by:",["Suspending and resuming processes","Rejecting jobs","Increasing the quantum","Deleting the PCB"],0,"بيعمل suspend و resume وبيشتغل كـ buffer."],
[4,"“Number of processes that complete their execution per time unit” is the definition of:",["Turnaround time","Throughput","Response time","Waiting time"],1,"Throughput."],
[4,"Response time is measured until:",["The process terminates","The first response is produced (not output)","The last output is printed","The process leaves the ready queue"],1,"Response time = من تقديم الطلب لحد أول response (مش output)."],
[4,"Which of the following should be MINIMIZED?",["CPU utilization","Throughput","Waiting time","None of them"],2,"Min turnaround · Min waiting · Min response. (Max: utilization + throughput)."],
[4,"Static priorities are:",["Easily changed during execution","Easy to implement but do not respond to external changes","Complex to implement","Always earned"],1,"Static: easy to implement, can’t be changed, no response to external changes."],
[4,"FCFS is a(n) ______ discipline.",["Preemptive","Nonpreemptive","Priority-based","Multilevel"],1,"FCFS = nonpreemptive."],
[4,"FCFS with (P1,24), (P2,3), (P3,3) arriving in order P1, P2, P3 gives an average waiting time of:",["3","17","27","30"],1,"(0+24+27)/3 = 17."],
[4,"With the same processes arriving in order P2, P3, P1, the FCFS average waiting time is:",["3","17","6","10"],0,"(6+0+3)/3 = 3."],
[4,"In Round Robin with n processes and quantum q, no process waits more than:",["nq","(n−1)q","q/n","n+q"],1,"(n−1)q time units."],
[4,"Round Robin with a very large quantum behaves like:",["SJF","Priority","FIFO (FCFS)","Real-time scheduling"],2,"q large → FIFO."],
[4,"A smaller time quantum in RR leads to:",["Fewer context switches","More context switches and more overhead","No change","Starvation"],1,"Smaller quantum increases context switches → overhead."],
[4,"In the RR example (q = 20; P1=53, P2=17, P3=68, P4=24), which process finishes first?",["P1 at 134","P2 at 37","P4 at 121","P3 at 162"],1,"P2 burst = 17 < 20 فبتخلّص في 37."],
[4,"SJF is optimal because it:",["Gives the minimum average waiting time","Gives the best response time","Never preempts","Needs no estimates"],0,"SJF optimal = minimum average waiting time."],
[4,"Preemptive SJF is known as:",["SRTF","FCFS","RR","MLFQ"],0,"Shortest-Remaining-Time-First."],
[4,"For P1(0,7), P2(2,4), P3(4,1), P4(5,4) the average waiting time under non-preemptive SJF is:",["3","4","5","7"],1,"(0+6+3+7)/4 = 4."],
[4,"For the same processes under preemptive SJF (SRTF) the average waiting time is:",["3","4","5","7"],0,"(9+1+0+2)/4 = 3."],
[4,"In priority scheduling the highest priority is the:",["Largest integer","Smallest integer","Longest burst","Latest arrival"],1,"Smallest integer ≡ highest priority."],
[4,"The solution to starvation in priority scheduling is:",["Aging","Preemption","Round robin","Deadline scheduling"],0,"Aging = increase priority as time progresses."],
[4,"In a multilevel queue the foreground (interactive) queue typically uses:",["FCFS","RR","SJF","Priority only"],1,"Foreground = RR، background = FCFS."],
[4,"In the MLFQ example, a new job first enters:",["Q0 (quantum 8 ms)","Q1 (quantum 16 ms)","Q2 (FCFS)","Any queue randomly"],0,"A new job enters Q0 (8 ms)."],
[4,"In that MLFQ example, a job that does not finish in Q1 is:",["Terminated","Moved to Q2 (FCFS)","Moved back to Q0","Suspended forever"],1,"Preempted and moved to Q2."],
[4,"A queue for each processor corresponds to:",["Master-slave / asymmetric multiprocessing","Self-scheduling / symmetric multiprocessing","Hard real-time","Deadline scheduling"],1,"Queue per processor = self-scheduling = symmetric multiprocessing."],
[4,"In a heterogeneous multiprocessor system:",["Programs must be compiled for the proper processors","All processes are identical","There is only one queue","No scheduling is needed"],0,"Heterogeneous: programs must be compiled for instructions on proper processors."],
[4,"In hard real-time scheduling, a task that cannot reserve its resources is:",["Delayed forever","Rejected","Given priority","Converted to soft real-time"],1,"Resource reservation: task is rejected if resources are not available."],
[4,"Soft real-time systems require:",["Large dispatch latency","Small dispatch latency, usually via preemption","No priorities","Fixed quantum of 8 ms"],1,"Soft RT: priority over others + small dispatch latency (preemption)."],
[4,"A deadline job delivered after its deadline is considered:",["Very high priority","Worthless","Low priority","Normal"],1,"Delivered after deadline: worthless."]
];
const TF=[
[1,"An OS is a program that controls the execution of application programs.",true,"صح — جزء من التعريف."],
[1,"A simple batch system can run many jobs at the same time.",false,"غلط — one job at a time."],
[1,"Storage systems are organized in a hierarchy by speed, cost and volatility.",true,"صح."],
[1,"General-purpose OSs fully support hard real-time systems.",false,"غلط — not supported by general purpose OS."],
[1,"Mainframes may process big jobs like payroll and billing late at night.",true,"صح."],
[1,"In a parallel system a job should be split into independent small jobs.",true,"صح."],
[1,"Limited memory, slow processors and small displays are issues of handheld systems.",true,"صح."],
[1,"In time-sharing, a program shares in time only if it exists in memory.",true,"صح."],
[1,"In personal systems all users share the same memory and processor.",false,"غلط — every user has own memory, processors and I/O."],
[1,"Many supercomputers are created by linking multiple PCs or microprocessor chips.",true,"صح."],
[2,"A trap is a hardware-generated interrupt caused by a device.",false,"غلط — software-generated."],
[2,"The interrupt architecture must save the address of the interrupted instruction and the CPU state.",true,"صح."],
[2,"An operating system is interrupt driven.",true,"صح."],
[2,"In asynchronous I/O the program must wait until I/O completes.",false,"غلط — ده synchronous."],
[2,"DMA lets the controller move blocks of data to main memory without CPU intervention.",true,"صح."],
[2,"Main memory is a non-volatile storage device.",false,"غلط — volatile."],
[2,"In UNIX the shell is the command-line interpreter.",true,"صح."],
[2,"MS-DOS is divided into well-separated modules.",false,"غلط — not well separated."],
[2,"In layered approach each layer uses services of lower-level layers only.",true,"صح."],
[2,"Virtual machines give complete protection but permit no direct resource sharing.",true,"صح."],
[2,"Policies determine how to do something; mechanisms decide what will be done.",false,"معكوسة — Mechanism = how، Policy = what."],
[2,"An OS written in a high-level language is easier to port.",true,"صح."],
[2,"System-call parameters may be passed in registers, in a memory table, or on the stack.",true,"صح."],
[3,"A process is a program in execution.",true,"صح."],
[3,"Several processes may be in the running state at the same time on one CPU.",false,"غلط — one process runs at a time."],
[3,"The list of waiting jobs is always ordered by priority.",false,"غلط — ready list in priority order؛ waiting unordered."],
[3,"The PCB is also called a process descriptor.",true,"صح."],
[3,"The short-term scheduler is invoked very infrequently.",false,"غلط — very frequently."],
[3,"The long-term scheduler controls the degree of multiprogramming.",true,"صح."],
[3,"A child process can have many parents.",false,"غلط — one parent."],
[3,"A parent process may have more than one child.",true,"صح."],
[3,"Threads of the same task share the code and data sections.",true,"صح."],
[3,"In direct communication a link is associated with exactly one pair of processes.",true,"صح."],
[3,"In indirect communication processes can communicate only if they share a mailbox.",true,"صح."],
[3,"With zero-capacity buffering the sender never waits.",false,"غلط — sender must wait."],
[3,"With unbounded capacity the sender never waits.",true,"صح."],
[3,"A CPU-bound process has many short CPU bursts.",false,"غلط — ده I/O-bound."]
,
[4,"The goal of CPU scheduling is to maximize CPU utilization.",true,"صح."],
[4,"A process execution cycle begins with an I/O burst.",false,"غلط — بتبدأ بـ CPU burst."],
[4,"CPU bursts typically consist of several short bursts and a few longer bursts.",true,"صح."],
[4,"In a nonpreemptive discipline the CPU can be taken away from a running process.",false,"غلط — ده الـ preemptive."],
[4,"Preemptive scheduling is useful when high-priority processes require rapid attention.",true,"صح."],
[4,"In nonpreemptive systems short jobs may have to wait for long jobs, but all processes are treated fairly.",true,"صح."],
[4,"The dispatcher belongs to high-level (job) scheduling.",false,"غلط — الـ dispatcher = low-level scheduling."],
[4,"Dispatch latency is the time it takes the dispatcher to stop one process and start another.",true,"صح."],
[4,"Response time is the time until the last output of a process is printed.",false,"غلط — until the first response is produced."],
[4,"We want to minimize turnaround time, waiting time and response time.",true,"صح — وبنكبّر الـ utilization والـ throughput."],
[4,"Dynamic priorities are easy to implement and cannot be changed.",false,"غلط — دي الـ static. الـ dynamic معقّدة ومتجاوبة."],
[4,"FCFS is a nonpreemptive discipline.",true,"صح."],
[4,"For FCFS, the arrival order does not affect the average waiting time.",false,"غلط — 17 لو P1,P2,P3 و 3 لو P2,P3,P1."],
[4,"In Round Robin, no process waits more than (n−1)q time units.",true,"صح."],
[4,"In Round Robin, a very small quantum reduces context-switch overhead.",false,"غلط — بيزوّد الـ context switches."],
[4,"SJF gives the minimum average waiting time for a given set of processes.",true,"صح — optimal."],
[4,"SRTF is the preemptive version of SJF.",true,"صح."],
[4,"In priority scheduling the smallest integer means the lowest priority.",false,"غلط — الأصغر = أعلى أولوية."],
[4,"Starvation can be solved by aging.",true,"صح."],
[4,"In a multilevel queue the background queue uses RR and the foreground queue uses FCFS.",false,"غلط — العكس: foreground = RR، background = FCFS."],
[4,"In a multilevel feedback queue a process can move between queues.",true,"صح."],
[4,"In the MLFQ example, Q2 is served by FCFS.",true,"صح."],
[4,"A common ready queue accessed by one processor corresponds to master-slave (asymmetric) multiprocessing.",true,"صح."],
[4,"In hard real-time scheduling, a task is rejected if its resources are not available.",true,"صح — resource reservation."],
[4,"Deadline jobs delivered after the deadline still have high value.",false,"غلط — worthless."]
];
const MCQ=M.map(x=>({l:x[0],q:x[1],o:x[2],a:x[3],e:x[4],k:'MCQ'}));
const TFQ=TF.map(x=>({l:x[0],q:x[1],o:['True ✅','False ❌'],a:x[2]?0:1,e:x[3],k:'T/F'}));

/* ============ QUIZ ENGINE ============ */
function quiz(el,bank,title){
  let lec=0,order=bank.map((_,i)=>i),ans={},rep=false;
  const draw=()=>{
    const items=order.filter(i=>!lec||bank[i].l==lec);
    const done=items.filter(i=>ans[i]!==undefined),right=done.filter(i=>ans[i]==bank[i].a).length;
    if(items.length&&done.length==items.length){if(!rep){rep=true;if(window.Hub)Hub.recordQuiz('os',title.replace(/^[^A-Za-z]+/,'')+(lec?' · Lecture '+lec:''),right,items.length)}}else rep=false;
    el.innerHTML=`<div class="lec-head"><h2>${title}</h2><p>${items.length} questions — اختار الإجابة وشوف الشرح بالمصري</p></div>
    <div class="scorebar"><b>Score: ${right}/${done.length}</b><div class="prog"><i style="width:${items.length?done.length/items.length*100:0}%"></i></div><span class="chips">${[[0,'All'],[1,'L1'],[2,'L2'],[3,'L3'],[4,'L4']].map(c=>`<button class="btn ${lec==c[0]?'':'ghost'}" data-l="${c[0]}">${c[1]}</button>`).join('')}<button class="btn ghost" data-a="sh">🔀 Shuffle</button><button class="btn ghost" data-a="rs">↺ Reset</button></span></div>`+
    items.map((i,n)=>{const b=bank[i],a=ans[i];return`<div class="q ${a!==undefined?'done':''}"><div class="qt"><i>L${b.l}</i>${n+1}. ${esc(b.q)}</div>${b.o.map((o,k)=>`<button class="opt ${a!==undefined?(k==b.a?'ok':k==a?'no':''):''}" data-q="${i}" data-k="${k}" ${a!==undefined?'disabled':''}>${esc(o)}</button>`).join('')}<div class="exp">${a==b.a?'🎉 <b>صح!</b> ':'❌ <b>غلط.</b> '}${b.e}</div></div>`}).join('')+
    (items.length&&done.length==items.length?`<div class="result"><h2>${Math.round(right/items.length*100)}%</h2><p>${right}/${items.length} — ${right/items.length>=.85?'🌟 ممتاز! انت جاهز':right/items.length>=.6?'👍 كويس، راجع الغلط':'💪 راجع المحاضرة وجرّب تاني'}</p></div>`:'');
  };
  draw();
  el.onclick=e=>{const t=e.target.closest('button');if(!t)return;
    if(t.dataset.q!==undefined){ans[t.dataset.q]=+t.dataset.k;const y=window.scrollY;draw();window.scrollTo(0,y)}
    else if(t.dataset.l!==undefined){lec=+t.dataset.l;draw()}
    else if(t.dataset.a=='sh'){order=shuffle(order);ans={};draw()}
    else if(t.dataset.a=='rs'){ans={};draw()}};
}

/* ============ FINAL TEST ============ */
function finalTest(el){
  let state='idle',items=[],ans={},left=0,timer=null;
  const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  const idle=()=>{el.innerHTML=`<div class="lec-head"><h2>⏱️ Final Test</h2><p>20 أسئلة عشوائية من كل المحاضرات (MCQ + True/False) — 15 دقيقة. الشرح بيظهر في الآخر.</p></div><div class="result"><h2>Ready?</h2><button class="btn" style="background:#fff;color:#7b2ff7;font-size:18px" data-a="go">🚀 Start Test</button></div>`};
  const run=()=>{
    el.innerHTML=`<div class="scorebar"><b>⏳ <span id="tm">${fmt(left)}</span></b><div class="prog"><i id="pg" style="width:${Object.keys(ans).length/items.length*100}%"></i></div><b>${Object.keys(ans).length}/${items.length}</b><button class="btn" data-a="sub">Submit ✅</button></div>`+
    items.map((b,n)=>`<div class="q"><div class="qt"><i>${b.k}</i><i>L${b.l}</i> ${n+1}. ${esc(b.q)}</div>${b.o.map((o,k)=>`<button class="opt ${ans[n]==k?'sel':''}" data-n="${n}" data-k="${k}">${esc(o)}</button>`).join('')}</div>`).join('');
  };
  const finish=()=>{clearInterval(timer);state='done';
    const r=items.filter((b,n)=>ans[n]==b.a).length,p=Math.round(r/items.length*100);if(window.Hub)Hub.recordQuiz('os','Final test',r,items.length);
    el.innerHTML=`<div class="result"><h2>${p}%</h2><p>${r}/${items.length} — ${p>=85?'🌟 Outstanding!':p>=65?'👏 Good job!':'💪 Keep revising!'}</p><button class="btn" style="background:#fff;color:#7b2ff7" data-a="go">🔁 New test</button></div>`+
    items.map((b,n)=>{const a=ans[n];return`<div class="q done"><div class="qt"><i>${b.k}</i><i>L${b.l}</i> ${n+1}. ${esc(b.q)}</div>${b.o.map((o,k)=>`<button class="opt ${k==b.a?'ok':k==a?'no':''}" disabled>${esc(o)}</button>`).join('')}<div class="exp">${a==b.a?'🎉 صح! ':a===undefined?'⚠️ مجاوبتش. ':'❌ غلط. '}${b.e}</div></div>`}).join('');
    window.scrollTo(0,0)};
  idle();
  el.onclick=e=>{const t=e.target.closest('button');if(!t)return;
    if(t.dataset.a=='go'){items=shuffle([...MCQ,...TFQ]).slice(0,20);ans={};left=900;state='run';run();clearInterval(timer);timer=setInterval(()=>{left--;const tm=$('#tm');if(tm)tm.textContent=fmt(left);if(left<=0)finish()},1000)}
    else if(t.dataset.a=='sub'){finish()}
    else if(t.dataset.n!==undefined&&state=='run'){ans[t.dataset.n]=+t.dataset.k;const y=window.scrollY;run();window.scrollTo(0,y)}};
}

/* ============ PAGE BUILD ============ */
function lecPage(n){
  const d=LEC[n];
  let h=`<div class="lec-head"><h2>📘 ${d.title}</h2><p>${d.sub}</p></div><div class="toc">${d.topics.map((t,i)=>`<a href="#" data-go="L${n}t${i}">${t.i} ${t.t}</a>`).join('')}</div>`;
  d.topics.forEach((t,i)=>{
    h+=`<article class="topic" id="L${n}t${i}"><h3><span class="ico">${t.i}</span>${i+1}. ${t.t} <small>${t.ta}</small></h3>
    <div class="box analogy" dir="rtl"><b>💡 تخيّل / Analogy:</b> ${t.an}</div>
    <div class="box theory"><h4>📖 Theory (English)</h4><ul>${t.th.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
    ${arBlock(n,i,t)}
    ${t.ex?`<div class="box example"><b>🧪 Example:</b> <div ${/<pre|<table|gantt/.test(t.ex)?'':'dir="rtl"'}>${t.ex}</div></div>`:''}
    ${t.viz?`<div class="viz" data-viz="${t.viz}"></div>`:''}
    <div class="box tip" dir="rtl">🎯 <b>Exam tip:</b> ${t.tip}</div></article>`});
  h+=`<div class="mm-open"><button class="btn" data-mm="l${n}">🧠 Open the Lecture ${n} mind map</button></div>`;
  h+=`<div class="sign">Made with 💜 by <b>HANNAH</b></div>`;
  return h;
}
const PAGES=[
 ['l1','📘 Lecture 1'],['l2','📗 Lecture 2'],['l3','📙 Lecture 3'],['l4','📕 Lecture 4'],['cheat','📝 Cheatsheet'],['cards','🃏 Flashcards'],['mcq','❓ MCQ'],['tf','✔️ True/False'],['test','⏱️ Final Test']];
const main=$('#os-main'),built={};
main.innerHTML=PAGES.map(p=>`<section class="page" id="pg-${p[0]}"></section>`).join('');
function build(id){
  if(built[id])return;built[id]=1;const el=$('#pg-'+id);
  if(id[0]=='l'&&id.length==2){el.innerHTML=lecPage(+id[1]);el.querySelectorAll('[data-viz]').forEach(v=>VIZ[v.dataset.viz](v))}
  if(id=='cheat')el.innerHTML='<div class="lec-head"><h2>📝 Cheatsheet</h2><p>ملخص المقارنات والأرقام — مراجعة آخر ليلة</p></div>'+CHEAT+CHEAT4;
  if(id=='cards'){el.innerHTML='<div class="lec-head"><h2>🃏 Flashcards</h2><p>اقرا السؤال، جاوب في دماغك، وبعدين دوس لتقلب الكارت</p></div><div class="grid">'+FLASH.map(f=>`<div class="flip"><div><div class="f">${esc(f[0])}</div><div class="b">${esc(f[1])}</div></div></div>`).join('')+'</div>';el.onclick=e=>{const f=e.target.closest('.flip');if(f)f.classList.toggle('on')}}
  if(id=='mcq')quiz(el,MCQ,'❓ Multiple Choice Questions');
  if(id=='tf')quiz(el,TFQ,'✔️ True or False');
  if(id=='test')finalTest(el);
}
function show(id){
  build(id);
  main.querySelectorAll(':scope > .page').forEach(p=>p.classList.toggle('on',p.id=='pg-'+id));
}
main.addEventListener('click',e=>{const m=e.target.closest('[data-mm]');if(m)Hub.openMap(m.dataset.mm)});
main.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(!g)return;const v=g.dataset.go;
  e.preventDefault();const t=document.getElementById(v);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})});
window.OS={LEC,AR_PLUS,M,TF,MCQ,TFQ,FLASH,show,build};

})();
